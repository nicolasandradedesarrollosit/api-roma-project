import { randomBytes, scrypt, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { admin } from "../../config/firebase";
import { JwtUtils } from "../../shared/utils/jwt.utils";
import type { AuthLoginDto, AuthRegisterDto } from "./auth.dto";
import { AuthUser, type IAuthUser } from "./auth.models";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, storedHash] = stored.split(":");
  if (!salt || !storedHash) return false;
  const hash = (await scryptAsync(password, salt, 64)) as Buffer;
  const storedHashBuffer = Buffer.from(storedHash, "hex");
  // timingSafeEqual prevents timing attacks
  return hash.byteLength === storedHashBuffer.byteLength && timingSafeEqual(hash, storedHashBuffer);
}

export class AuthService {
  /**
   * Register new user with email/password (non-Firebase flow)
   */
  async register(data: AuthRegisterDto): Promise<Omit<IAuthUser, "password">> {
    const existingUser = await AuthUser.findOne({ email: data.email });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await hashPassword(data.password);
    const user = await AuthUser.create({ ...data, password: hashedPassword });

    const userResponse = user.toObject();
    delete (userResponse as any).password;

    return userResponse;
  }

  /**
   * Login user with email/password (non-Firebase flow)
   */
  async login(data: AuthLoginDto): Promise<{ user: any; token: string }> {
    const user = await AuthUser.findOne({ email: data.email }).select("+password");

    if (!user || !user.password) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await verifyPassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = JwtUtils.generateToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    const userResponse = user.toObject();
    delete (userResponse as any).password;

    return { user: userResponse, token };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<Omit<IAuthUser, "password"> | null> {
    const user = await AuthUser.findById(userId);
    return user;
  }

  /**
   * Verify a Firebase ID token
   */
  async verifyFirebaseToken(idToken: string) {
    return admin.auth().verifyIdToken(idToken);
  }

  /**
   * Find or create a user from a decoded Firebase token.
   * If the user already exists but has empty names (race condition during
   * registration — onIdTokenChanged fires before updateProfile completes),
   * the names are updated from the token's name claim on the next call.
   */
  async findOrCreateByFirebase(decoded: { uid: string; email?: string; name?: string }) {
    const existing = await AuthUser.findOne({ firebaseUid: decoded.uid });

    if (existing) {
      // Race condition fix: if the user was created before updateProfile set
      // the displayName, the token on the next call (after getIdToken refresh)
      // will carry the name claim — update the DB at that point.
      if (decoded.name && (!existing.firstName || !existing.lastName)) {
        const [firstName = "", lastName = ""] = decoded.name.split(" ", 2);
        existing.firstName = firstName;
        existing.lastName = lastName;
        await existing.save();
      }
      return existing;
    }

    const [firstName = "", lastName = ""] = (decoded.name || "").split(" ", 2);

    const user = await AuthUser.create({
      firebaseUid: decoded.uid,
      email: decoded.email || "",
      firstName,
      lastName,
      isVerified: true,
    });

    return user;
  }
}

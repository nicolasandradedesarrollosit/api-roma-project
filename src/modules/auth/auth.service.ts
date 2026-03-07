import { admin } from "../../config/firebase";
import { JwtUtils } from "../../shared/utils/jwt.utils";
import type { AuthLoginDto, AuthRegisterDto } from "./auth.dto";
import { AuthUser, type IAuthUser } from "./auth.models";

export class AuthService {
  /**
   * Register new user
   */
  async register(data: AuthRegisterDto): Promise<Omit<IAuthUser, "password">> {
    const existingUser = await AuthUser.findOne({ email: data.email });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    // TODO: Hash password before saving
    const user = await AuthUser.create(data);

    const userResponse = user.toObject();
    delete (userResponse as any).password;

    return userResponse;
  }

  /**
   * Login user
   */
  async login(data: AuthLoginDto): Promise<{ user: any; token: string }> {
    const user = await AuthUser.findOne({ email: data.email }).select("+password");

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // TODO: Compare password hash
    // const isPasswordValid = await comparePassword(data.password, user.password);
    // if (!isPasswordValid) throw new Error('Invalid email or password');

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
   * Find or create a user from a decoded Firebase token
   */
  async findOrCreateByFirebase(decoded: {
    uid: string;
    email?: string;
    name?: string;
  }) {
    const existing = await AuthUser.findOne({ firebaseUid: decoded.uid });
    if (existing) return existing;

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

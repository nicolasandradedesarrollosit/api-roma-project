import jwt from "jsonwebtoken";
import type { IAuthPayload } from "../types";

export class JwtUtils {
  private static readonly secret: string =
    process.env.JWT_SECRET || "secret-key-min-32-characters-long-required";

  private static readonly expiresIn: string = process.env.JWT_EXPIRES_IN || "7d";

  /**
   * Generate JWT token
   */
  static generateToken(payload: IAuthPayload): string {
    return jwt.sign(payload, JwtUtils.secret, { expiresIn: JwtUtils.expiresIn } as any);
  }

  /**
   * Verify JWT token
   */
  static verifyToken(token: string): IAuthPayload | null {
    try {
      return jwt.verify(token, JwtUtils.secret) as IAuthPayload;
    } catch (_error) {
      return null;
    }
  }

  /**
   * Decode token without verification
   */
  static decodeToken(token: string): IAuthPayload | null {
    try {
      return jwt.decode(token) as IAuthPayload | null;
    } catch (_error) {
      return null;
    }
  }
}

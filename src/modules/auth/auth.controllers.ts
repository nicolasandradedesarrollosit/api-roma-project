import type { Request, Response } from "express";
import type { AuthLoginDto, AuthRegisterDto, CreateSessionDto } from "./auth.dto";
import { AuthService } from "./auth.service";

const authService = new AuthService();

const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 3600000, // 1 hour
  path: "/",
};

export class AuthController {
  /**
   * Register endpoint
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as AuthRegisterDto;
      const user = await authService.register(dto);
      res.status(201).json({ message: "User registered successfully", data: user });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  /**
   * Login endpoint
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as AuthLoginDto;
      const result = await authService.login(dto);
      res.status(200).json({ message: "Login successful", data: result });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Create session — verifies Firebase ID token and sets httpOnly cookie
   */
  static async createSession(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as CreateSessionDto;
      const decoded = await authService.verifyFirebaseToken(dto.idToken);
      const user = await authService.findOrCreateByFirebase(decoded);
      await authService.syncCustomClaims(decoded.uid, user.role);
      res.cookie("session", dto.idToken, SESSION_COOKIE_OPTIONS);
      res.status(200).json({
        message: "Session created",
        data: { uid: decoded.uid, email: decoded.email, userId: user._id, role: user.role },
      });
    } catch (_error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  /**
   * Refresh session — verifies new Firebase ID token and updates httpOnly cookie
   */
  static async refreshSession(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as CreateSessionDto;
      const decoded = await authService.verifyFirebaseToken(dto.idToken);
      const user = await authService.findOrCreateByFirebase(decoded);
      await authService.syncCustomClaims(decoded.uid, user.role);
      res.cookie("session", dto.idToken, SESSION_COOKIE_OPTIONS);
      res.status(200).json({
        message: "Session refreshed",
        data: { uid: decoded.uid, email: decoded.email, role: user.role },
      });
    } catch (_error) {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  /**
   * Destroy session — clears the httpOnly cookie
   */
  static async destroySession(_req: Request, res: Response): Promise<void> {
    res.clearCookie("session", { path: "/" });
    res.status(200).json({ message: "Session destroyed" });
  }
}

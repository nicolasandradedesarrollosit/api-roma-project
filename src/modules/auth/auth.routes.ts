import { Router } from "express";
import { AuthController } from "./auth.controllers";

const authRouter = Router();

/**
 * POST /api/v1/auth/register
 * Register new user
 */
authRouter.post("/register", AuthController.register);

/**
 * POST /api/v1/auth/login
 * Login user
 */
authRouter.post("/login", AuthController.login);

/**
 * POST /api/v1/auth/session
 * Create session from Firebase ID token
 */
authRouter.post("/session", AuthController.createSession);

/**
 * POST /api/v1/auth/session/refresh
 * Refresh session with a new Firebase ID token
 */
authRouter.post("/session/refresh", AuthController.refreshSession);

/**
 * DELETE /api/v1/auth/session
 * Destroy session (clear cookie)
 */
authRouter.delete("/session", AuthController.destroySession);

export default authRouter;

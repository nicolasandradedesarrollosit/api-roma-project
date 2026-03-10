import { Router } from "express";
import { validateDto } from "../../shared/middlewares";
import { AuthController } from "./auth.controllers";
import { AuthLoginDto, AuthRegisterDto, CreateSessionDto } from "./auth.dto";

const authRouter = Router();

/**
 * POST /api/v1/auth/register
 * Register new user
 */
authRouter.post("/register", validateDto(AuthRegisterDto), AuthController.register);

/**
 * POST /api/v1/auth/login
 * Login user
 */
authRouter.post("/login", validateDto(AuthLoginDto), AuthController.login);

/**
 * POST /api/v1/auth/session
 * Create session from Firebase ID token
 */
authRouter.post("/session", validateDto(CreateSessionDto), AuthController.createSession);

/**
 * POST /api/v1/auth/session/refresh
 * Refresh session with a new Firebase ID token
 */
authRouter.post("/session/refresh", validateDto(CreateSessionDto), AuthController.refreshSession);

/**
 * DELETE /api/v1/auth/session
 * Destroy session (clear cookie)
 */
authRouter.delete("/session", AuthController.destroySession);

export default authRouter;

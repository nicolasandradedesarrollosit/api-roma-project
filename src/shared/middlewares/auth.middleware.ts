import type { NextFunction, Request, Response } from "express";
import { admin } from "../../config/firebase";
import type { IAuthPayload } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: IAuthPayload;
    }
  }
}

async function extractAndVerifyToken(req: Request): Promise<IAuthPayload | null> {
  const cookieToken = req.cookies?.session as string | undefined;
  const authHeader = req.headers.authorization;
  const headerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

  const token = cookieToken ?? headerToken;
  if (!token) return null;

  const decoded = await admin.auth().verifyIdToken(token);
  return { userId: decoded.uid, email: decoded.email ?? "", role: "user" };
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const payload = await extractAndVerifyToken(req);
    if (!payload) {
      res.status(401).json({ message: "Authorization token missing" });
      return;
    }
    req.user = payload;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const optionalAuthMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const payload = await extractAndVerifyToken(req);
    if (payload) req.user = payload;
  } catch (_error) {
    // Continue without authentication if token is invalid
  }
  next();
};

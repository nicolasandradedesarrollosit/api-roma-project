import type { NextFunction, Request, Response } from "express";
import { UserRole } from "../types";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.user) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  if (req.user.role !== UserRole.ADMIN) {
    res.status(403).json({ message: "Admin access required" });
    return;
  }

  next();
};

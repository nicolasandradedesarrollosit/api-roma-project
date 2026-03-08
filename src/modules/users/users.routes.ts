import { Router } from "express";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { UserController } from "./users.controllers";

const usersRouter = Router();

usersRouter.get("/", authMiddleware, adminMiddleware, UserController.getAll);

export default usersRouter;

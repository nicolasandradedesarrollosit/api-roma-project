import { Router } from "express";
import { validateDto } from "../../shared/middlewares";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { UserController } from "./users.controllers";
import { UserQueryDto } from "./users.dto";

const usersRouter = Router();

usersRouter.get(
  "/",
  authMiddleware,
  adminMiddleware,
  validateDto(UserQueryDto, "query"),
  UserController.getAll,
);

export default usersRouter;

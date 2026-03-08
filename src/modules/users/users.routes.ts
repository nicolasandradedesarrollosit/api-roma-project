import { Router } from "express";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { validateDto } from "../../shared/middlewares";
import { UserQueryDto } from "./users.dto";
import { UserController } from "./users.controllers";

const usersRouter = Router();

usersRouter.get("/", authMiddleware, adminMiddleware, validateDto(UserQueryDto, "query"), UserController.getAll);

export default usersRouter;

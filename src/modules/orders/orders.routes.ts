import { Router } from "express";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { validateDto } from "../../shared/middlewares";
import { OrderQueryDto } from "./orders.dto";
import { OrderController } from "./orders.controllers";

const ordersRouter = Router();

ordersRouter.get("/", authMiddleware, adminMiddleware, validateDto(OrderQueryDto, "query"), OrderController.getAll);
ordersRouter.get("/:id", authMiddleware, adminMiddleware, OrderController.getById);

export default ordersRouter;

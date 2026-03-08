import { Router } from "express";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { OrderController } from "./orders.controllers";

const ordersRouter = Router();

ordersRouter.get("/", authMiddleware, adminMiddleware, OrderController.getAll);
ordersRouter.get("/:id", authMiddleware, adminMiddleware, OrderController.getById);

export default ordersRouter;

import { Router } from "express";
import { validateDto } from "../../shared/middlewares";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { OrderController } from "./orders.controllers";
import { OrderQueryDto } from "./orders.dto";

const ordersRouter = Router();

ordersRouter.get(
  "/",
  authMiddleware,
  adminMiddleware,
  validateDto(OrderQueryDto, "query"),
  OrderController.getAll,
);
ordersRouter.get("/:id", authMiddleware, adminMiddleware, OrderController.getById);

export default ordersRouter;

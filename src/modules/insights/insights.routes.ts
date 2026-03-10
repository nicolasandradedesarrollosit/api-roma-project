import { Router } from "express";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { InsightsController } from "./insights.controllers";

const insightsRouter = Router();

insightsRouter.get("/", authMiddleware, adminMiddleware, InsightsController.getDashboard);

export default insightsRouter;

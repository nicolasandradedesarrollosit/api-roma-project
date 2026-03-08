import "reflect-metadata";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { type Express } from "express";
import { connectDatabase } from "./config/database";
import authRouter from "./modules/auth/auth.routes";
import insightsRouter from "./modules/insights/insights.routes";
import ordersRouter from "./modules/orders/orders.routes";
import productsRouter from "./modules/products/products.routes";
import usersRouter from "./modules/users/users.routes";

const app: Express = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/orders", ordersRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/insights", insightsRouter);

// Error handling middleware
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

// Start server
const start = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error);
    process.exit(1);
  }
};

start();

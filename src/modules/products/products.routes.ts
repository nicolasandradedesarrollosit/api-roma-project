import { Router } from "express";
import multer from "multer";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { ProductController } from "./products.controllers";

const productsRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

productsRouter.get("/", ProductController.getAll);
productsRouter.get("/:id", ProductController.getById);
productsRouter.post("/", authMiddleware, adminMiddleware, ProductController.create);
productsRouter.patch("/:id", authMiddleware, adminMiddleware, ProductController.update);
productsRouter.delete("/:id", authMiddleware, adminMiddleware, ProductController.delete);
productsRouter.post("/upload", authMiddleware, adminMiddleware, upload.single("image"), ProductController.uploadImage);

export default productsRouter;

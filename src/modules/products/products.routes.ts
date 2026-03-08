import { Router } from "express";
import multer from "multer";
import { validateDto } from "../../shared/middlewares";
import { adminMiddleware } from "../../shared/middlewares/admin.middleware";
import { authMiddleware } from "../../shared/middlewares/auth.middleware";
import { ProductController } from "./products.controllers";
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from "./products.dto";

const productsRouter = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

productsRouter.get("/", validateDto(ProductQueryDto, "query"), ProductController.getAll);
productsRouter.get("/:id", ProductController.getById);
productsRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  validateDto(CreateProductDto),
  ProductController.create,
);
productsRouter.patch(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateDto(UpdateProductDto, "body", { validatorOptions: { skipMissingProperties: true } }),
  ProductController.update,
);
productsRouter.delete("/:id", authMiddleware, adminMiddleware, ProductController.delete);
productsRouter.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  ProductController.uploadImage,
);

export default productsRouter;

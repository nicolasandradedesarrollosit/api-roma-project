import type { Request, Response } from "express";
import mongoose from "mongoose";
import type { CreateProductDto, ProductQueryDto, UpdateProductDto } from "./products.dto";
import { ProductService } from "./products.service";

const productService = new ProductService();

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export class ProductController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query as unknown as ProductQueryDto;
      const result = await productService.findAll(query);
      res.status(200).json({ message: "Products retrieved", data: result });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      if (!isValidObjectId(id)) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      const product = await productService.findById(id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({ message: "Product retrieved", data: product });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const dto = req.body as CreateProductDto;
      const product = await productService.create(dto);
      res.status(201).json({ message: "Product created", data: product });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async update(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      if (!isValidObjectId(id)) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      const dto = req.body as UpdateProductDto;
      const product = await productService.update(id, dto);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({ message: "Product updated", data: product });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  static async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id);
      if (!isValidObjectId(id)) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      const product = await productService.softDelete(id);
      if (!product) {
        res.status(404).json({ message: "Product not found" });
        return;
      }
      res.status(200).json({ message: "Product deactivated", data: product });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async uploadImage(req: Request, res: Response): Promise<void> {
    try {
      if (!req.file) {
        res.status(400).json({ message: "No file provided" });
        return;
      }
      const url = await productService.uploadImage(req.file);
      res.status(200).json({ message: "Image uploaded", data: { url } });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

import type { Request, Response } from "express";
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from "./products.dto";
import { ProductService } from "./products.service";

const productService = new ProductService();

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
      const product = await productService.findById(req.params.id as string);
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
      const dto = req.body as UpdateProductDto;
      const product = await productService.update(req.params.id as string, dto);
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
      const product = await productService.softDelete(req.params.id as string);
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

import type { Request, Response } from "express";
import { OrderQueryDto } from "./orders.dto";
import { OrderService } from "./orders.service";

const orderService = new OrderService();

export class OrderController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query as unknown as OrderQueryDto;
      const result = await orderService.findAll(query);
      res.status(200).json({ message: "Orders retrieved", data: result });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const order = await orderService.findById(req.params.id as string);
      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }
      res.status(200).json({ message: "Order retrieved", data: order });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

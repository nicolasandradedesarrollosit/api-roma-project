import type { Request, Response } from "express";
import { InsightsService } from "./insights.service";

const insightsService = new InsightsService();

export class InsightsController {
  static async getDashboard(_req: Request, res: Response): Promise<void> {
    try {
      const data = await insightsService.getDashboard();
      res.status(200).json({ message: "Dashboard insights retrieved", data });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

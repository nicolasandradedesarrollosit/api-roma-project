import type { Request, Response } from "express";
import type { UserQueryDto } from "./users.dto";
import { UserService } from "./users.service";

const userService = new UserService();

export class UserController {
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query as unknown as UserQueryDto;
      const result = await userService.findAll(query);
      res.status(200).json({ message: "Users retrieved", data: result });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
}

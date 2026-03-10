import type { OrderQueryDto } from "./orders.dto";
import { Order } from "./orders.models";

export class OrderService {
  async findAll(query: OrderQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (query.status) filter.status = query.status;
    if (query.userId) filter.userId = query.userId;

    const [data, total] = await Promise.all([
      Order.find(filter)
        .populate("userId", "email firstName lastName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Order.countDocuments(filter),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    return Order.findById(id).populate("userId", "email firstName lastName");
  }
}

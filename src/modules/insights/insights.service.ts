import { AuthUser } from "../auth/auth.models";
import { Order } from "../orders/orders.models";
import { Product } from "../products/products.models";

export class InsightsService {
  async getDashboard() {
    const [totalProducts, outOfStock, totalOrders, totalUsers, revenueResult, ordersByStatus] = await Promise.all([
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: true, stock: 0 }),
      Order.countDocuments(),
      AuthUser.countDocuments(),
      Order.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
      Order.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    ]);

    const revenue = revenueResult[0]?.total ?? 0;
    const statusCounts = Object.fromEntries(ordersByStatus.map((s) => [s._id, s.count]));

    return {
      totalProducts,
      outOfStock,
      totalOrders,
      totalUsers,
      revenue,
      ordersByStatus: statusCounts,
    };
  }
}

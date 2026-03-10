import { AuthUser } from "../auth/auth.models";
import type { UserQueryDto } from "./users.dto";

export class UserService {
  async findAll(query: UserQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (query.role) filter.role = query.role;
    if (query.search) {
      filter.$or = [
        { email: { $regex: query.search, $options: "i" } },
        { firstName: { $regex: query.search, $options: "i" } },
        { lastName: { $regex: query.search, $options: "i" } },
      ];
    }

    const [data, total] = await Promise.all([
      AuthUser.find(filter).select("-password").sort({ createdAt: -1 }).skip(skip).limit(limit),
      AuthUser.countDocuments(filter),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }
}

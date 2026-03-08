import { StorageUtils } from "../../shared/utils/storage.utils";
import type { CreateProductDto, ProductQueryDto, UpdateProductDto } from "./products.dto";
import { Product } from "./products.models";

const PRODUCTS_BUCKET = "products";

export class ProductService {
  async findAll(query: ProductQueryDto) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (query.category) filter.category = query.category;
    if (query.isActive !== undefined) filter.isActive = query.isActive;
    if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
    }

    const [data, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }

  async findById(id: string) {
    return Product.findById(id);
  }

  async create(data: CreateProductDto) {
    return Product.create(data);
  }

  async update(id: string, data: UpdateProductDto) {
    return Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async softDelete(id: string) {
    return Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    const filename = `${Date.now()}-${file.originalname}`;
    const path = `images/${filename}`;
    return StorageUtils.uploadFile(PRODUCTS_BUCKET, file.buffer, path, file.mimetype);
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const path = imageUrl.split(`${PRODUCTS_BUCKET}/`).pop();
    if (path) await StorageUtils.deleteFile(PRODUCTS_BUCKET, path);
  }
}

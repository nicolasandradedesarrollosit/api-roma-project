import mongoose, { Schema } from "mongoose";
import { ProductCategory, ProductMaterial, type IProduct } from "./products.types";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    stock: { type: Number, required: true, default: 0, min: 0 },
    category: {
      type: String,
      enum: Object.values(ProductCategory),
      required: true,
    },
    material: {
      type: String,
      enum: Object.values(ProductMaterial),
      required: true,
    },
    capacity: { type: Number, required: true },
    color: { type: String, required: true },
    dimensions: {
      height: { type: Number, required: true },
      diameter: { type: Number, required: true },
    },
    weight: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    slug: { type: String, unique: true },
  },
  { timestamps: true },
);

productSchema.index({ category: 1 });
productSchema.index({ isActive: 1 });

productSchema.pre("save", function () {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
});

export const Product = mongoose.model<IProduct>("Product", productSchema);

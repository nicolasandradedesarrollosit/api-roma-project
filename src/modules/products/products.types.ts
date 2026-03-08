import type { Document } from "mongoose";

export enum ProductCategory {
  CLASICA = "clasica",
  PREMIUM = "premium",
  COLECCION = "coleccion",
  PERSONALIZADA = "personalizada",
}

export enum ProductMaterial {
  CERAMICA = "ceramica",
  PORCELANA = "porcelana",
  GRES = "gres",
}

export interface IProductDimensions {
  height: number;
  diameter: number;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
  category: ProductCategory;
  material: ProductMaterial;
  capacity: number;
  color: string;
  dimensions: IProductDimensions;
  weight: number;
  isActive: boolean;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

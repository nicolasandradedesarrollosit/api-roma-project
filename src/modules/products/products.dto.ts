import { IsArray, IsBoolean, IsEnum, IsNumber, IsOptional, IsString, MaxLength, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { ProductCategory, ProductMaterial } from "./products.types";

class DimensionsDto {
  @IsNumber()
  height!: number;

  @IsNumber()
  diameter!: number;
}

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name!: string;

  @IsString()
  @MaxLength(1000)
  description!: string;

  @IsNumber()
  @Min(0)
  price!: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsNumber()
  @Min(0)
  stock!: number;

  @IsEnum(ProductCategory)
  category!: ProductCategory;

  @IsEnum(ProductMaterial)
  material!: ProductMaterial;

  @IsNumber()
  @Min(1)
  capacity!: number;

  @IsString()
  color!: string;

  @ValidateNested()
  @Type(() => DimensionsDto)
  dimensions!: DimensionsDto;

  @IsNumber()
  @Min(0)
  weight!: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class UpdateProductDto {
  @IsString()
  @MaxLength(100)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(1000)
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @IsNumber()
  @Min(0)
  @IsOptional()
  stock?: number;

  @IsEnum(ProductCategory)
  @IsOptional()
  category?: ProductCategory;

  @IsEnum(ProductMaterial)
  @IsOptional()
  material?: ProductMaterial;

  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;

  @IsString()
  @IsOptional()
  color?: string;

  @ValidateNested()
  @Type(() => DimensionsDto)
  @IsOptional()
  dimensions?: DimensionsDto;

  @IsNumber()
  @Min(0)
  @IsOptional()
  weight?: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class ProductQueryDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit?: number;

  @IsEnum(ProductCategory)
  @IsOptional()
  category?: ProductCategory;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isActive?: boolean;

  @IsString()
  @IsOptional()
  search?: string;
}

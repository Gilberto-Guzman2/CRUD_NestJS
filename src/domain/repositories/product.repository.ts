import { Product } from '../entities/product';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export interface ProductRepository {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
  create(data: CreateProductDto): Promise<Product>;
  update(id: number, data: UpdateProductDto): Promise<Product>;
  delete(id: number): Promise<void>;
}

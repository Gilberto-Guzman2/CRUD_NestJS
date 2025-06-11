import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../domain/dtos/product.dto';
import { Product } from '../../domain/entities/product';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepository')
    private readonly repository: ProductRepository,
  ) {}
  async list(): Promise<Product[]> {
    return this.repository.findAll();
  }

  async get(id: number): Promise<Product> {
    const product = await this.repository.findById(id);
    if (!product) throw new NotFoundException(`Product ${id} not found`);
    return product;
  }

  async create(data: CreateProductDto): Promise<Product> {
    return this.repository.create(data);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new NotFoundException(`Product ${id} not found`);
    return this.repository.update(id, data);
  }

  async remove(id: number): Promise<void> {
    const exists = await this.repository.findById(id);
    if (!exists) throw new NotFoundException(`Product ${id} not found`);
    return this.repository.delete(id);
  }
}

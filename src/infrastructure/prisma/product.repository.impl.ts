import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { PrismaClient, Product as PrismaProduct } from '@prisma/client';
import { Product } from '../../domain/entities/product';
import {
  CreateProductDto,
  UpdateProductDto,
} from '../../domain/dtos/product.dto';

@Injectable()
export class PrismaProductRepository implements ProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  private toDomain(pr: PrismaProduct): Product {
    return new Product(
      pr.id,
      pr.name,
      pr.price,
      pr.description || undefined,
      pr.createdAt,
      pr.updatedAt,
    );
  }

  async findAll(): Promise<Product[]> {
    const items = await this.prisma.product.findMany();
    return items.map(this.toDomain);
  }

  async findById(id: number): Promise<Product | null> {
    const pr = await this.prisma.product.findUnique({ where: { id } });
    return pr ? this.toDomain(pr) : null;
  }

  async create(data: CreateProductDto): Promise<Product> {
    const pr = await this.prisma.product.create({ data });
    return this.toDomain(pr);
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const pr = await this.prisma.product.update({ where: { id }, data });
    return this.toDomain(pr);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}

export interface CreateProductDto {
  name: string;
  price: number;
  description?: string;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  description?: string;
}

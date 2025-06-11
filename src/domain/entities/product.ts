export class Product {
  constructor(
    public readonly id: number | null,
    public name: string,
    public price: number,
    public description?: string,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}

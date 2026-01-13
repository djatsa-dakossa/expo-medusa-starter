import { Product } from '../entities/Product';

export interface IProductRepository {
  getProducts(params?: {
    limit?: number;
    offset?: number;
    categoryId?: string;
  }): Promise<Product[]>;

  getProductById(id: string): Promise<Product | null>;

  getSimilarProducts(productId: string, limit?: number): Promise<Product[]>;

  searchProducts(query: string): Promise<Product[]>;
}

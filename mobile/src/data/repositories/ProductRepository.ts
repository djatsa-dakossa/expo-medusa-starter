// Repository Implementation - implements the interface from domain layer
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { IMedusaDataSource } from '../datasources/IMedusaDataSource';
import { ProductMapper } from '../mappers/ProductMapper';

export class ProductRepository implements IProductRepository {
  constructor(private medusaDataSource: IMedusaDataSource) {}

  async getProducts(params?: {
    limit?: number;
    offset?: number;
    categoryId?: string;
  }): Promise<Product[]> {
    const response = await this.medusaDataSource.getProducts({
      limit: params?.limit,
      offset: params?.offset,
      category_id: params?.categoryId ? [params.categoryId] : undefined,
    });

    return ProductMapper.toDomainList(response.products);
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      const medusaProduct = await this.medusaDataSource.getProduct(id);
      return ProductMapper.toDomain(medusaProduct);
    } catch (error) {
      // Product not found
      return null;
    }
  }

  async getSimilarProducts(productId: string, limit?: number): Promise<Product[]> {
    try {
      const response = await this.medusaDataSource.getSimilarProducts(productId, limit);
      return ProductMapper.toDomainList(response.products);
    } catch (error) {
      console.error('Error fetching similar products:', error);
      return [];
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    const response = await this.medusaDataSource.searchProducts(query);
    return ProductMapper.toDomainList(response.products);
  }
}

import { Category } from '../../domain/entities/Category';
import { ICategoryRepository } from '../../domain/repositories/ICategoryRepository';
import { IMedusaDataSource } from '../datasources/IMedusaDataSource';
import { CategoryMapper } from '../mappers/CategoryMapper';

export class CategoryRepository implements ICategoryRepository {
  constructor(private medusaDataSource: IMedusaDataSource) {}

  async getCategories(): Promise<Category[]> {
    const response = await this.medusaDataSource.getCategories();
    return CategoryMapper.toDomainList(response.product_categories);
  }

  async getCategoryById(id: string): Promise<Category | null> {
    try {
      const response = await this.medusaDataSource.getCategory(id);
      return CategoryMapper.toDomain(response.product_category);
    } catch (error) {
      return null;
    }
  }

  async getCategoryByHandle(handle: string): Promise<Category | null> {
    const categories = await this.getCategories();
    return categories.find((c) => c.handle === handle) || null;
  }
}

import { Category } from '../entities/Category';

export interface ICategoryRepository {
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  getCategoryByHandle(handle: string): Promise<Category | null>;
}

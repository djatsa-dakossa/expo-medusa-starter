import { Category } from '../../domain/entities/Category';

export interface MedusaCategory {
  id: string;
  name: string;
  handle: string;
  description?: string;
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
  product_category_image?: CategoryImage;
}

interface CategoryImage {
  url: string;
}

export class CategoryMapper {
  static toDomain(medusaCategory: MedusaCategory): Category {
    return {
      id: medusaCategory.id,
      name: medusaCategory.name,
      handle: medusaCategory.handle,
      description: medusaCategory.description,
      imageUrl: String(medusaCategory.product_category_image?.url).replace("localhost", "192.168.1.116"),
      productCount: medusaCategory.metadata?.product_count,
      createdAt: new Date(medusaCategory.created_at),
      updatedAt: new Date(medusaCategory.updated_at),
    };
  }

  static toDomainList(medusaCategories: MedusaCategory[]): Category[] {
    return medusaCategories.map((category) => this.toDomain(category));
  }
}

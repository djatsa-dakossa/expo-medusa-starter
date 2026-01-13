// Mapper - converts API DTOs to Domain Entities
import { Product, ProductVariant, ProductOption } from '../../domain/entities/Product';
import { MedusaProduct } from '../datasources/IMedusaDataSource';

export class ProductMapper {
  static toDomain(medusaProduct: MedusaProduct): Product {
    const firstVariant = medusaProduct.variants?.[0];
    const firstPrice = firstVariant?.prices?.[0];

    // Map variants
    const variants: ProductVariant[] = (medusaProduct.variants || []).map(variant => ({
      id: variant.id,
      title: variant.title,
      sku: variant.sku,
      inventoryQuantity: variant.inventory_quantity,
      allowBackorder: variant.allow_backorder,
      options: variant.options.map(opt => ({
        id: opt.id,
        value: opt.value,
        optionTitle: opt.option.title,
      })),
      price: variant.prices?.[0]?.amount || 0,
      currency: variant.prices?.[0]?.currency_code || 'usd',
    }));

    // Map options
    const options: ProductOption[] = (medusaProduct.options || []).map(option => ({
      id: option.id,
      title: option.title,
      values: option.values.map(val => ({
        id: val.id,
        value: val.value,
      })),
    }));

    // Map images
    const images = (medusaProduct.images || []).map(img => ({
      id: img.id,
      url: img.url,
      rank: img.rank,
    }));

    return {
      id: medusaProduct.id,
      title: medusaProduct.title,
      subtitle: medusaProduct.subtitle,
      description: medusaProduct.description,
      handle: medusaProduct.handle,
      price: firstPrice?.amount || 0,
      currency: firstPrice?.currency_code || 'usd',
      imageUrl: medusaProduct.images?.[0]?.url || null,
      thumbnail: medusaProduct.thumbnail,
      images,
      available: medusaProduct.status === 'published',
      weight: medusaProduct.weight,
      material: medusaProduct.material,
      variants,
      options,
      createdAt: new Date(medusaProduct.created_at),
      updatedAt: new Date(medusaProduct.updated_at),
    };
  }

  static toDomainList(medusaProducts: MedusaProduct[]): Product[] {
    return medusaProducts.map((product) => this.toDomain(product));
  }
}

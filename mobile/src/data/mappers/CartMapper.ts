// Cart Mapper
import { Cart, CartItem } from '../../domain/entities/Cart';
import { MedusaCart } from '../datasources/IMedusaDataSource';

export class CartMapper {
  static toDomain(medusaCart: MedusaCart): Cart {
    return {
      id: medusaCart.id,
      items: medusaCart.items.map((item) => ({
        id: item.id,
        productId: item.variant_id, // Using variant_id as productId for simplicity
        variantId: item.variant_id,
        variantTitle: item.variant_title,
        title: item.title,
        quantity: item.quantity,
        unitPrice: item.unit_price,
        total: item.total,
        thumbnail: item.thumbnail,
      })),
      subtotal: medusaCart.subtotal,
      tax: medusaCart.tax_total,
      total: medusaCart.total,
      currency: medusaCart.region.currency_code,
      createdAt: new Date(medusaCart.created_at),
      updatedAt: new Date(medusaCart.updated_at),
    };
  }
}

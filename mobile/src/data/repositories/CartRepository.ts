// Cart Repository Implementation
import { Cart, CartItem } from '../../domain/entities/Cart';
import { ICartRepository } from '../../domain/repositories/ICartRepository';
import { IMedusaDataSource } from '../datasources/IMedusaDataSource';
import { CartMapper } from '../mappers/CartMapper';

export class CartRepository implements ICartRepository {
  constructor(private medusaDataSource: IMedusaDataSource) {}

  async getCart(cartId: string): Promise<Cart | null> {
    try {
      const response = await this.medusaDataSource.getCart(cartId);
      return CartMapper.toDomain(response.cart);
    } catch (error) {
      return null;
    }
  }

  async createCart(): Promise<Cart> {
    const response = await this.medusaDataSource.createCart();
    return CartMapper.toDomain(response.cart);
  }

  async addItem(
    cartId: string,
    item: Omit<CartItem, 'id' | 'total'>
  ): Promise<Cart> {
    const response = await this.medusaDataSource.addLineItem(cartId, {
      variant_id: item.variantId,
      quantity: item.quantity,
    });
    return CartMapper.toDomain(response.cart);
  }

  async updateItemQuantity(
    cartId: string,
    itemId: string,
    quantity: number
  ): Promise<Cart> {
    const response = await this.medusaDataSource.updateLineItem(
      cartId,
      itemId,
      quantity
    );
    return CartMapper.toDomain(response.cart);
  }

  async removeItem(cartId: string, itemId: string): Promise<Cart> {
    const response = await this.medusaDataSource.deleteLineItem(cartId, itemId);
    return CartMapper.toDomain(response.cart);
  }

  async clearCart(cartId: string): Promise<Cart> {
    const cart = await this.getCart(cartId);
    if (!cart) {
      throw new Error('Cart not found');
    }

    // Remove all items
    for (const item of cart.items) {
      await this.removeItem(cartId, item.id);
    }

    const updatedCart = await this.getCart(cartId);
    if (!updatedCart) {
      throw new Error('Failed to clear cart');
    }

    return updatedCart;
  }
}

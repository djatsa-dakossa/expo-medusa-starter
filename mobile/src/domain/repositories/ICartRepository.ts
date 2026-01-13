import { Cart, CartInit, CartItemAdd } from '../entities/Cart';

export interface ICartRepository {
  getCart(cartId: string): Promise<Cart | null>;

  createCart(data: CartInit): Promise<Cart>;

  addItem(cartId: string, item: CartItemAdd): Promise<Cart>;

  updateItemQuantity(cartId: string, itemId: string, quantity: number): Promise<Cart>;

  removeItem(cartId: string, itemId: string): Promise<Cart>;

  clearCart(cartId: string): Promise<Cart>;
}

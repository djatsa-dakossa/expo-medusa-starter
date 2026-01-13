import { Cart, CartItemAdd } from '../entities/Cart';
import { ICartRepository } from '../repositories/ICartRepository';

export class AddToCartUseCase {
  constructor(
    private cartRepository: ICartRepository,
  ) {}

  async execute(params: {
    cartId: string;
    productId: string;
    variantId: string;
    quantity: number;
  }): Promise<Cart> {
    if (params.quantity <= 0) {
      throw new Error('Quantity must be greater than 0');
    }

    const cartItem: CartItemAdd = {
      variantId: params.variantId,
      quantity: params.quantity,
    };

    return this.cartRepository.addItem(params.cartId, cartItem);
  }
}

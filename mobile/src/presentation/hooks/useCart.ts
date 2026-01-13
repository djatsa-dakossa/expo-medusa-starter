// Cart Hook
import { useState, useEffect } from 'react';
import { Cart } from '../../domain/entities/Cart';
import { ICartRepository } from '../../domain/repositories/ICartRepository';
import { AddToCartUseCase } from '../../domain/usecases/AddToCartUseCase';
import { container } from '../../core/di/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from '@/src/core/utils/showMessage';

const CART_ID_KEY = '@cart_id';

export function useCart() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const cartRepository = container.get<ICartRepository>('CartRepository');
  const addToCartUseCase = container.get<AddToCartUseCase>('AddToCartUseCase');

  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    const cartInitData = {
      "cart": {
        "id": "string",
        "currency_code": "usd",
        "original_item_total": 0,
        "original_item_subtotal": 0,
        "original_item_tax_total": 0,
        "item_total": 0,
        "item_subtotal": 0,
        "item_tax_total": 0,
        "original_total": 0,
        "original_subtotal": 0,
        "original_tax_total": 0,
        "total": 0,
        "subtotal": 0,
        "tax_total": 0,
        "discount_total": 0,
        "discount_tax_total": 0,
        "gift_card_total": 0,
        "gift_card_tax_total": 0,
        "shipping_total": 0,
        "shipping_subtotal": 0,
        "shipping_tax_total": 0,
        "original_shipping_total": 0,
        "original_shipping_subtotal": 0,
        "original_shipping_tax_total": 0,
      }
    }
    try {
      setLoading(true);

      // Try to get existing cart ID
      let cartId = await AsyncStorage.getItem(CART_ID_KEY);

      if (cartId) {
        // Load existing cart
        const existingCart = await cartRepository.getCart(cartId);
        if (existingCart) {
          setCart(existingCart);
          console.log('Existing cart loaded');
          console.log(existingCart);
          return;
        }
      }

      // Create new cart
      const newCart = await cartRepository.createCart(cartInitData);
      await AsyncStorage.setItem(CART_ID_KEY, newCart.id);
      setCart(newCart);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to initialize cart'));
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId: string, variantId: string, quantity: number = 1) => {
    if (!cart) {
      throw new Error('Cart not initialized');
    }

    try {
      setLoading(true);
      setError(null);
      const updatedCart = await addToCartUseCase.execute({
        cartId: cart.id,
        productId,
        variantId,
        quantity,
      });
      setCart(updatedCart);
      // Notify UI
      showMessage({
        title: 'Produit ajouté au panier',
        message: 'Merci de vérifier votre panier',
      })
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add item'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cart) return;

    try {
      setLoading(true);
      const updatedCart = await cartRepository.updateItemQuantity(cart.id, itemId, quantity);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update quantity'));
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId: string) => {
    if (!cart) return;

    try {
      setLoading(true);
      const updatedCart = await cartRepository.removeItem(cart.id, itemId);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove item'));
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!cart) return;

    try {
      setLoading(true);
      const updatedCart = await cartRepository.clearCart(cart.id);
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to clear cart'));
    } finally {
      setLoading(false);
    }
  };

  return {
    cart,
    loading,
    error,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    itemCount: cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0,
  };
}

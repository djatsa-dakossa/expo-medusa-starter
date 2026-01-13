import { CartItem } from './Cart';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shippingCost: number;
  total: number;
  currency: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

  // Customer info
  customerEmail: string;
  customerPhone?: string;

  // Shipping address
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    countryCode: string;
    postalCode?: string;
    phone?: string;
  };

  // Billing address
  billingAddress?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    countryCode: string;
    postalCode?: string;
    phone?: string;
  };

  // Payment
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  paymentStatus: 'pending' | 'authorized' | 'captured' | 'refunded' | 'cancelled';

  shippingMethod?: string;
  promoCode?: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderRequest {
  cartId: string;
  email: string;
  phone?: string;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    countryCode: string;
    postalCode?: string;
    phone?: string;
  };
  billingAddress?: {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    countryCode: string;
    postalCode?: string;
    phone?: string;
  };
  shippingMethod?: string;
  paymentMethod: 'card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery';
  promoCode?: string;
}

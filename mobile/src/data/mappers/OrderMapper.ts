import { Order } from '../../domain/entities/Order';
import { CartMapper } from './CartMapper';

export interface MedusaOrder {
  id: string;
  display_id: number;
  items: any[];
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  total: number;
  currency_code: string;
  status: string;
  fulfillment_status: string;
  payment_status: string;
  email: string;
  phone?: string;
  shipping_address: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    country_code: string;
    postal_code?: string;
    phone?: string;
  };
  billing_address?: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    country_code: string;
    postal_code?: string;
    phone?: string;
  };
  payments?: any[];
  shipping_methods?: any[];
  metadata?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export class OrderMapper {
  static toDomain(medusaOrder: MedusaOrder): Order {
    const payment = medusaOrder.payments?.[0];
    const shippingMethod = medusaOrder.shipping_methods?.[0];

    return {
      id: medusaOrder.id,
      orderNumber: `AFTFS${medusaOrder.display_id}`,
      items: medusaOrder.items.map((item) => CartMapper.toCartItem(item)),
      subtotal: medusaOrder.subtotal / 100,
      tax: medusaOrder.tax_total / 100,
      shippingCost: medusaOrder.shipping_total / 100,
      total: medusaOrder.total / 100,
      currency: medusaOrder.currency_code.toUpperCase(),
      status: this.mapOrderStatus(medusaOrder.fulfillment_status),
      customerEmail: medusaOrder.email,
      customerPhone: medusaOrder.phone,
      shippingAddress: {
        firstName: medusaOrder.shipping_address.first_name,
        lastName: medusaOrder.shipping_address.last_name,
        address1: medusaOrder.shipping_address.address_1,
        address2: medusaOrder.shipping_address.address_2,
        city: medusaOrder.shipping_address.city,
        countryCode: medusaOrder.shipping_address.country_code,
        postalCode: medusaOrder.shipping_address.postal_code,
        phone: medusaOrder.shipping_address.phone,
      },
      billingAddress: medusaOrder.billing_address
        ? {
            firstName: medusaOrder.billing_address.first_name,
            lastName: medusaOrder.billing_address.last_name,
            address1: medusaOrder.billing_address.address_1,
            address2: medusaOrder.billing_address.address_2,
            city: medusaOrder.billing_address.city,
            countryCode: medusaOrder.billing_address.country_code,
            postalCode: medusaOrder.billing_address.postal_code,
            phone: medusaOrder.billing_address.phone,
          }
        : undefined,
      paymentMethod: this.mapPaymentMethod(payment?.provider_id),
      paymentStatus: this.mapPaymentStatus(medusaOrder.payment_status),
      shippingMethod: shippingMethod?.shipping_option?.name,
      promoCode: medusaOrder.metadata?.promo_code,
      createdAt: new Date(medusaOrder.created_at),
      updatedAt: new Date(medusaOrder.updated_at),
    };
  }

  private static mapOrderStatus(status: string): Order['status'] {
    switch (status) {
      case 'not_fulfilled':
        return 'pending';
      case 'fulfilled':
        return 'delivered';
      case 'partially_fulfilled':
        return 'processing';
      case 'shipped':
        return 'shipped';
      case 'canceled':
        return 'cancelled';
      default:
        return 'pending';
    }
  }

  private static mapPaymentStatus(status: string): Order['paymentStatus'] {
    switch (status) {
      case 'awaiting':
        return 'pending';
      case 'captured':
        return 'captured';
      case 'refunded':
        return 'refunded';
      case 'canceled':
        return 'cancelled';
      default:
        return 'pending';
    }
  }

  private static mapPaymentMethod(providerId?: string): Order['paymentMethod'] {
    if (!providerId) return 'card';

    if (providerId.includes('paypal')) return 'paypal';
    if (providerId.includes('bank')) return 'bank_transfer';
    if (providerId.includes('cash')) return 'cash_on_delivery';

    return 'card';
  }

  static toDomainList(medusaOrders: MedusaOrder[]): Order[] {
    return medusaOrders.map((order) => this.toDomain(order));
  }
}

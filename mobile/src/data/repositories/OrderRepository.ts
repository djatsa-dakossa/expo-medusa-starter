import { Order, CreateOrderRequest } from '../../domain/entities/Order';
import { IOrderRepository } from '../../domain/repositories/IOrderRepository';
import { IMedusaDataSource } from '../datasources/IMedusaDataSource';
import { OrderMapper } from '../mappers/OrderMapper';

export class OrderRepository implements IOrderRepository {
  constructor(private medusaDataSource: IMedusaDataSource) {}

  async createOrder(request: CreateOrderRequest): Promise<Order> {
    const orderData = {
      email: request.email,
      shipping_address: {
        first_name: request.shippingAddress.firstName,
        last_name: request.shippingAddress.lastName,
        address_1: request.shippingAddress.address1,
        address_2: request.shippingAddress.address2,
        city: request.shippingAddress.city,
        country_code: request.shippingAddress.countryCode,
        postal_code: request.shippingAddress.postalCode,
        phone: request.shippingAddress.phone,
      },
      billing_address: request.billingAddress
        ? {
            first_name: request.billingAddress.firstName,
            last_name: request.billingAddress.lastName,
            address_1: request.billingAddress.address1,
            address_2: request.billingAddress.address2,
            city: request.billingAddress.city,
            country_code: request.billingAddress.countryCode,
            postal_code: request.billingAddress.postalCode,
            phone: request.billingAddress.phone,
          }
        : undefined,
    };

    const response = await this.medusaDataSource.createOrder(
      request.cartId,
      orderData
    );

    return OrderMapper.toDomain(response.order);
  }

  async getOrderById(id: string): Promise<Order | null> {
    try {
      const response = await this.medusaDataSource.getOrder(id);
      return OrderMapper.toDomain(response.order);
    } catch (error) {
      return null;
    }
  }

  async getOrders(customerId?: string): Promise<Order[]> {
    // Note: Medusa requires customer authentication for this endpoint
    // For now, return empty array
    return [];
  }
}

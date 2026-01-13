import { Order, CreateOrderRequest } from '../entities/Order';
import { IOrderRepository } from '../repositories/IOrderRepository';
import { ValidationError } from '../../core/errors/AppError';

export class CreateOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async execute(request: CreateOrderRequest): Promise<Order> {
    // Validate request
    if (!request.email || !request.email.includes('@')) {
      throw new ValidationError('Valid email is required');
    }

    if (!request.shippingAddress.firstName || !request.shippingAddress.lastName) {
      throw new ValidationError('First name and last name are required');
    }

    if (!request.shippingAddress.address1) {
      throw new ValidationError('Address is required');
    }

    if (!request.shippingAddress.city) {
      throw new ValidationError('City is required');
    }

    if (!request.shippingAddress.countryCode) {
      throw new ValidationError('Country is required');
    }

    // Create order
    return this.orderRepository.createOrder(request);
  }
}

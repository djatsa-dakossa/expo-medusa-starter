import { Order, CreateOrderRequest } from '../entities/Order';

export interface IOrderRepository {
  createOrder(request: CreateOrderRequest): Promise<Order>;
  getOrderById(id: string): Promise<Order | null>;
  getOrders(customerId?: string): Promise<Order[]>;
}

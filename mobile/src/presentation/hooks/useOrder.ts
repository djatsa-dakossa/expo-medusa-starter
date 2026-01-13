import { useState } from 'react';
import { Order, CreateOrderRequest } from '../../domain/entities/Order';
import { CreateOrderUseCase } from '../../domain/usecases/CreateOrderUseCase';
import { container } from '../../core/di/Container';

export function useOrder() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createOrderUseCase =
    container.get<CreateOrderUseCase>('CreateOrderUseCase');

  const createOrder = async (request: CreateOrderRequest): Promise<Order> => {
    try {
      setLoading(true);
      setError(null);
      const newOrder = await createOrderUseCase.execute(request);
      setOrder(newOrder);
      return newOrder;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to create order');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    order,
    loading,
    error,
    createOrder,
  };
}

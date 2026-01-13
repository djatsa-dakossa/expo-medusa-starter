// Custom Hook - Presentation layer uses use cases
import { useState, useEffect } from 'react';
import { Product } from '../../domain/entities/Product';
import { GetProductsUseCase } from '../../domain/usecases/GetProductsUseCase';
import { container } from '../../core/di/Container';

export function useProducts(params?: {
  limit?: number;
  offset?: number;
  categoryId?: string;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getProductsUseCase = container.get<GetProductsUseCase>('GetProductsUseCase');

  useEffect(() => {
    loadProducts();
  }, [params?.limit, params?.offset, params?.categoryId]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getProductsUseCase.execute(params);
      setProducts(result);
    } catch (err) {
      console.log(err);
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const refresh = () => {
    loadProducts();
  };

  return {
    products,
    loading,
    error,
    refresh,
  };
}

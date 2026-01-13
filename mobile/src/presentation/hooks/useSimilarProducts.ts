import { useState, useEffect } from 'react';
import { Product } from '../../domain/entities/Product';
import { ProductRepository } from '@/src/data/repositories/ProductRepository';

export function useSimilarProducts(productId: string | null, limit: number = 6) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!productId) {
      setProducts([]);
      return;
    }

    const fetchSimilarProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const similarProducts = await ProductRepository.getSimilarProducts(productId, limit);
        setProducts(similarProducts);
      } catch (err) {
        setError(err as Error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [productId, limit]);

  return { products, loading, error };
}

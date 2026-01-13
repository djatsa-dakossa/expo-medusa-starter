import { useState, useEffect } from 'react';
import { Product } from '../../domain/entities/Product';
import { IProductRepository } from '../../domain/repositories/IProductRepository';
import { container } from '../../core/di/Container';

export function useProduct(productId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const productRepository =
    container.get<IProductRepository>('ProductRepository');

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await productRepository.getProductById(productId);
      setProduct(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load product'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId]);

  useEffect(() => {
    console.log('product changed', product);
  }, [product]);

  return {
    product,
    loading,
    error,
    refresh: loadProduct,
  };
}

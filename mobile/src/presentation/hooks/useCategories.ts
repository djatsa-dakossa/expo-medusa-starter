import { useState, useEffect } from 'react';
import { Category } from '../../domain/entities/Category';
import { GetCategoriesUseCase } from '../../domain/usecases/GetCategoriesUseCase';
import { container } from '../../core/di/Container';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const getCategoriesUseCase =
    container.get<GetCategoriesUseCase>('GetCategoriesUseCase');

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getCategoriesUseCase.execute();
      setCategories(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to load categories'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return {
    categories,
    loading,
    error,
    refresh: loadCategories,
  };
}

import React from 'react';
import { useRouter } from 'expo-router';
import { HomeScreen } from '@/src/presentation/screens/HomeScreen';
import { Product } from '@/src/domain/entities/Product';
import { Category } from '@/src/domain/entities/Category';

export default function HomeTab() {
  const router = useRouter();

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/product/[id]' as any,
      params: { id: product.id },
    });
  };

  const handleCategoryPress = (category: Category) => {
    console.log("handleCategoryPress", category.name);
    router.push({
      pathname: '/category/[id]' as any,
      params: { id: category.id, name: category.name },
    });
  };

  return (
    <HomeScreen
      onProductPress={handleProductPress}
      onCategoryPress={handleCategoryPress}
    />
  );
}

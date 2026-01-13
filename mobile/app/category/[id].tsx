import React, { useEffect } from 'react';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { CategoryScreen } from '@/src/presentation/screens/CategoryScreen';
import { Product } from '@/src/domain/entities/Product';
import { AppHeader } from '@/src/presentation/components';

export default function CategoryPage() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const navigation = useNavigation();
  const router = useRouter();

  const handleProductPress = (product: Product) => {
    router.push({
      pathname: '/product/[id]' as any,
      params: { id: product.id },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      header: () => (
        <AppHeader
          showBackButton
          title={name ?? "Category"}
          showNotificationButton
        />
      ),
    });
  }, [name]);

  return (
    <CategoryScreen
      categoryId={id}
      categoryName={name || 'Catégorie'}
      onProductPress={handleProductPress}
    />
  );
}

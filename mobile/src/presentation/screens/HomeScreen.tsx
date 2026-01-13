import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useProducts } from '@/src/presentation/hooks/useProducts';
import { useCategories } from '@/src/presentation/hooks/useCategories';
import { FlashSaleBanner } from '@/src/presentation/components/FlashSaleBanner';
import { CategoryGrid } from '@/src/presentation/components/CategoryGrid';
import { ProductGrid } from '@/src/presentation/components/ProductGrid';
import { Product } from '@/src/domain/entities/Product';
import { Category } from '@/src/domain/entities/Category';
import SearchBar from '@/src/presentation/components/SearchBar';

interface HomeScreenProps {
  onProductPress: (product: Product) => void;
  onCategoryPress: (category: Category) => void;
}

export function HomeScreen({
  onProductPress,
  onCategoryPress,
}: HomeScreenProps) {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    refresh: refreshProducts,
  } = useProducts({ limit: 20 });

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
    refresh: refreshCategories,
  } = useCategories();

  const isLoading = productsLoading || categoriesLoading;

  const handleRefresh = async () => {
    await Promise.all([refreshProducts(), refreshCategories()]);
  };

  // Flash sale ends in 4 days, 10 hours, 20 minutes, 25 seconds from now
  const flashSaleEndsAt = new Date();
  flashSaleEndsAt.setDate(flashSaleEndsAt.getDate() + 4);
  flashSaleEndsAt.setHours(flashSaleEndsAt.getHours() + 10);
  flashSaleEndsAt.setMinutes(flashSaleEndsAt.getMinutes() + 20);
  flashSaleEndsAt.setSeconds(flashSaleEndsAt.getSeconds() + 25);

  if (isLoading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
    >
      <SearchBar />
      <FlashSaleBanner endsAt={flashSaleEndsAt} />
      
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Catalogues</Text>
      </View>
      {categories.length > 0 && (
        <CategoryGrid
          categories={categories.slice(0, 6)}
          onCategoryPress={onCategoryPress}
        />
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top des prix</Text>
      </View>

      {productsError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{productsError.message}</Text>
        </View>
      )}

      <ProductGrid
        products={products}
        onProductPress={onProductPress}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 500,
    color: '#1F2937',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#FEE2E2',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  errorText: {
    color: '#DC2626',
    textAlign: 'center',
  },
});

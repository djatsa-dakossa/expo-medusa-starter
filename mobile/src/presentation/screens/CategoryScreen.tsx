import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Product } from '../../domain/entities/Product';
import { useProducts } from '../hooks/useProducts';
import { ProductGrid } from '../components/ProductGrid';
import { BannerCarousel } from '../components/BannerCarousel';

interface CategoryScreenProps {
  categoryId: string;
  categoryName: string;
  onProductPress: (product: Product) => void;
}

export function CategoryScreen({
  categoryId,
  categoryName,
  onProductPress,
}: CategoryScreenProps) {
  const {
    products,
    loading,
    error,
    refresh,
  } = useProducts({ categoryId, limit: 20 });

  // Sample banners - these should be fetched from the backend
  const banners = [
    {
      id: '1',
      title: 'Drones professionnels',
      description: ' Puissance, précision et performance : les drones conçus pour les missions les plus exigeantes.',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop',
    },
    {
      id: '2',
      title: 'Flash sale',
      description: '4 jours restant',
      image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800&h=400&fit=crop',
    },
    {
      id: '3',
      title: 'Flash sale',
      description: '4 jours restant',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop',
    },
  ];

  if (loading && products.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message}</Text>
        </View>
      )}

      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <ProductGrid
              products={[item]}
              onProductPress={onProductPress}
              showFlashSaleBadge={true}
              containerStyle={styles.productGridContainer}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <BannerCarousel banners={banners} />
        }
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun produit trouvé</Text>
          </View>
        }
      />
    </View>
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
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
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
  listContent: {
    paddingTop: 16,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  productContainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
  },
  productGridContainer: {
    paddingHorizontal: 0,
  },
});

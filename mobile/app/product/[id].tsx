import React, { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ProductDetailScreen } from '@/src/presentation/screens/ProductDetailScreen';
import { useProduct } from '@/src/presentation/hooks/useProduct';
import { useCart } from '@/src/presentation/hooks/useCart';
import { Alert } from 'react-native';

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { product, loading } = useProduct(id);
  const { addItem } = useCart();

  // Update header title when product loads
  useEffect(() => {
    if (product) {
      router.setParams({ title: product.title });
    }
  }, [product, router]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      // Assuming first variant for now
      const variantId = product.id;
      await addItem(product.id, variantId, 1);
      Alert.alert('Succès', 'Produit ajouté au panier!');
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ajouter au panier');
    }
  };

  return (
    <ProductDetailScreen
      product={product}
      loading={loading}
      onAddToCart={handleAddToCart}
    />
  );
}

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { PurchaseType, Product } from '../../domain/entities/Product';
import { useCart } from '../hooks/useCart';
import { useSimilarProducts } from '../hooks/useSimilarProducts';
import { Ionicons } from '@expo/vector-icons';
import { APP_COLORS } from '@/constants/appColors';
import IconButton from '../components/IconButton';
import Accordion from '../components/Accordion';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface ProductDetailScreenProps {
  product: Product | null;
  loading: boolean;
  onAddToCart: () => void;
}

export function ProductDetailScreen({
  product,
  loading,
  onAddToCart,
}: ProductDetailScreenProps) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [buyType, setBuyType] = useState<PurchaseType>(PurchaseType.BUY);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const { addItem, loading: cartLoading } = useCart();
  const { products: similarProducts, loading: similarLoading } = useSimilarProducts(product?.id || null, 6);

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    addItem(product.id, selectedVariant);
  }

  const handleAddToWhishlist = (product: Product) => {
    if (!product) return;
  }

  const handleSimilarProductPress = (similarProduct: Product) => {
    router.push(`/product/${similarProduct.id}`);
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
      </View>
    );
  }

  // Mock images for carousel (in real app, use product.images)
  const images = product.thumbnail
    ? [product.thumbnail, product.thumbnail, product.thumbnail, product.thumbnail]
    : [];

  return (
    <ScrollView style={styles.container}>
      {/* Image Carousel */}
      <View style={styles.imageCarouselContainer}>
        {images.length > 0 ? (
          <>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={(event) => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / width
                );
                setCurrentImageIndex(index);
              }}
            >
              {images.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image }}
                  style={styles.carouselImage}
                />
              ))}
            </ScrollView>

            {/* Image indicators */}
            <View style={styles.indicatorContainer}>
              {images.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.indicator,
                    index === currentImageIndex && styles.activeIndicator,
                  ]}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={[styles.carouselImage, styles.placeholderImage]}>
            <Text style={styles.placeholderText}>📦</Text>
          </View>
        )}
      </View>

      {/* Product Info */}
      <View style={styles.productInfo}>

        <View style={styles.buyTypeContainer}>
          {product.variants.map((variant) => (
            <TouchableOpacity
              style={[
                styles.buyTypeButton,
                selectedVariant === variant.id && styles.buyTypeButtonActive
              ]}
              onPress={() => setSelectedVariant(variant.id)}
              key={`productVariant-${variant.id}`}
            >
              <Text style={styles.buyType}>
                {variant.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            <Ionicons name="star" size={15} color={APP_COLORS.starColor} />
            <Ionicons name="star" size={15} color={APP_COLORS.starColor} />
            <Ionicons name="star" size={15} color={APP_COLORS.starColor} />
            <Ionicons name="star" size={15} color={APP_COLORS.starColor} />
            <Ionicons name="star" size={15} color={APP_COLORS.starColor} />
          </View>
          <Text style={styles.reviewCount}>45 avis</Text>
          <TouchableOpacity>
            <Text style={styles.reviewButton}>Laisser un avis</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.productTitle}>{product.title}</Text>

        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionText}>
            {product.description || ''}
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {product.price.toLocaleString()} {product.currency}
          </Text>
          <Text style={styles.priceDescription}>Toutes taxes comprises</Text>
        </View>
          
        <View style={styles.productActionsContainer}>
          <TouchableOpacity
            style={[styles.addToCartButton, cartLoading && styles.buttonDisabled]}
            onPress={() => handleAddToCart()}
            
            disabled={cartLoading}
          >
            <View style={styles.addToCartTextContainer}>
              <Ionicons name="cart-outline" size={20} color={APP_COLORS.white} />
              <Text style={styles.addToCartText}>
                {cartLoading ? 'Ajout en cours...' : 'Ajouter au panier'}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <IconButton onPress={() => handleAddToWhishlist(product)} buttonStyles={styles.addToWhishlistButton}>
              <Ionicons name="heart-outline" size={20} color={APP_COLORS.primary} />
            </IconButton>
          </View>
        </View>

        <Accordion title="Description" containerStyle={styles.containerStyle}>
          <Text style={styles.descriptionText}>
            {product.description || ''}
          </Text>
        </Accordion>
        <Accordion title="Fiche technique" containerStyle={styles.containerStyle}>
          <Text style={styles.descriptionText}>
            {product.description || ''}
          </Text>
        </Accordion>
        <Accordion title="Informations du vendeur" containerStyle={styles.containerStyle}>
          {/* Seller Info */}
          <View style={styles.sellerSection}>
            <View style={styles.sellerInfo}>
              <Text style={styles.sellerName}>Lazone Store</Text>
              <Text style={styles.sellerRating}>⭐ 4.8 (1,234 ventes)</Text>
            </View>
          </View>
        </Accordion>
        <Accordion title="Avis clients" containerStyle={styles.containerStyle}>
          <Text style={styles.descriptionText}>
            {product.description || ''}
          </Text>
        </Accordion>

        {/* Similar Products */}
        {similarLoading ? (
          <View style={styles.similarSection}>
            <Text style={styles.sectionTitle}>Produits similaires</Text>
            <ActivityIndicator size="small" color={APP_COLORS.primary} style={{ marginVertical: 20 }} />
          </View>
        ) : similarProducts.length > 0 ? (
          <View style={styles.similarSection}>
            <Text style={styles.sectionTitle}>Produits similaires</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {similarProducts.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.similarProductCard}
                  onPress={() => handleSimilarProductPress(item)}
                  activeOpacity={0.7}
                >
                  {item.thumbnail && (
                    <Image source={{ uri: item.thumbnail }} style={styles.similarProductImage} />
                  )}
                  <Text style={styles.similarProductName} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.similarProductPrice}>
                    {item.price.toLocaleString()} {item.currency}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : null}
      </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  errorText: {
    fontSize: 16,
    color: '#DC2626',
  },
  imageCarouselContainer: {
    position: 'relative',
    backgroundColor: '#F3F4F6',
  },
  carouselImage: {
    width: width,
    height: width,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 80,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 24,
  },
  actionButtons: {
    position: 'absolute',
    top: 16,
    right: 16,
    gap: 8,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 20,
  },
  productInfo: {
    padding: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stars: {
    fontSize: 16,
  },
  reviewCount: {
    marginLeft: 8,
    fontSize: 14,
  },
  price: {
    fontSize: 28,
    fontWeight: 700,
    color: APP_COLORS.primary,
    textTransform: 'uppercase',
  },
  addToCartButton: {
    backgroundColor: APP_COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 500,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 22,
  },
  sellerSection: {
    marginBottom: 24,
  },
  sellerInfo: {
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  sellerRating: {
    fontSize: 14,
    color: '#6B7280',
  },
  similarSection: {
    marginBottom: 24,
  },
  similarProductCard: {
    width: 140,
    marginRight: 12,
  },
  similarProductImage: {
    width: 140,
    height: 140,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    marginBottom: 8,
  },
  placeholderImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderEmoji: {
    fontSize: 48,
  },
  similarProductName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  reviewButton: {
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 8,
  },
  buyTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 8,
  },
  buyType: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_COLORS.primary,
  },
  buyTypeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: "#6624831A"
  },
  buyTypeButtonActive: {
    backgroundColor: "#fff",
    borderColor: APP_COLORS.primary,
    borderWidth: 1,
  },
  priceContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: APP_COLORS.borderColor,
    marginBottom: 12,
  },
  priceDescription: {
    fontSize: 14,
    color: APP_COLORS.textGray,
  },
  productActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    shadowColor: '#000',
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
    marginHorizontal: -16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  addToCartTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addToWhishlistButton: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: APP_COLORS.primary,

  },
  containerStyle: {
    backgroundColor: '#6624830D',
    paddingHorizontal: 8,
    borderBottomColor: APP_COLORS.borderColor,
    borderBottomWidth: 1,
  },
  productVariantsContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 16,
  },
  productVariantButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: "#6624831A"
  },
  productVariant: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_COLORS.primary,
  },
  productVariantButtonActive: {
    borderColor: APP_COLORS.primary,
    borderWidth: 1,
  }
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../../domain/entities/Product';
import { Colors } from '@/constants/theme';
import { APP_ASSETS } from '@/constants/appAssets';
import { APP_COLORS } from '@/constants/appColors';
import IconButton from './IconButton';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  showBadges?: boolean;
}

export function ProductCard({
  product,
  onPress,
  onAddToWishlist,
  showBadges = true,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => onPress(product)}
      activeOpacity={0.7}
    >
      {showBadges && (
        <View style={styles.badges}>
          {
            product.variants.map((variant) => (
              <View key={`home-${variant.id}`}>
                <Text style={styles.badge}>{variant.title}</Text>
              </View>
            ))
          }
        </View>
      )}

      {product.thumbnail ? (
        <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      ) : (
        <View style={[styles.productImage, styles.placeholderImage]}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}

      <View style={styles.productInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {product.title}
        </Text>

        {product.description && (
          <Text style={styles.description} numberOfLines={2}>
            {product.description}
          </Text>
        )}

        <Text style={styles.price}>
          {product.price.toLocaleString()} {product.currency}
        </Text>

        <View style={styles.actions}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={15} color={Colors.light.starColor} />
            <Ionicons name="star" size={15} color={Colors.light.starColor} />
            <Ionicons name="star" size={15} color={Colors.light.starColor} />
          </View>
          {onAddToWishlist && (
            <IconButton onPress={() => onAddToWishlist(product)}>
              <Ionicons name="heart-outline" size={20} color={Colors.light.tint} />
            </IconButton>
          )}
        </View>

        <View style={styles.sellerInfo}>
          <View style={styles.sellerImageContainer}>
            <Image
              source={APP_ASSETS.profilePlaceholder}
              style={styles.sellerImage}
            />
          </View>
          <View>
            <Text style={styles.sellerName}>Jean-Marc K.</Text>
            <Text style={styles.sellerTitle}>Vendeur (Bénin)</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#DDE1E6',
  },
  badges: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    zIndex: 1,
    gap: 4,
  },
  badge: {
    color: '#fff',
    fontSize: 10,
    backgroundColor: Colors.light.tint,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 15,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F3F4F6',
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 48,
  },
  productInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light.tint,
    marginBottom: 4,
  },
  description: {
    fontWeight: '400',
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
  },
  price: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.light.tint,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
  sellerImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  sellerImage: {
    width: '100%',
    height: '100%',
  },
  sellerName: {
    fontSize: 14,
    fontWeight: '600',
    color: APP_COLORS.textBlack,
  },
  sellerTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: APP_COLORS.textGray,
  },
});

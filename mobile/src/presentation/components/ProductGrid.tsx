import React from "react";
import { View, StyleSheet, Dimensions, ViewStyle } from "react-native";
import { Product } from "../../domain/entities/Product";
import { ProductCard } from "./ProductCard";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_MARGIN = 8;
const CONTAINER_PADDING = 16;
const CARD_WIDTH = (SCREEN_WIDTH - CONTAINER_PADDING * 2 - CARD_MARGIN * 2) / 2;

interface ProductGridProps {
  products: Product[];
  onProductPress: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  showBadges?: boolean;
  containerStyle?: ViewStyle;
}

export function ProductGrid({
  products,
  onProductPress,
  onAddToWishlist,
  showBadges = true,
  containerStyle,
}: ProductGridProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {products.map((product) => (
        <View key={product.id} style={styles.cardWrapper}>
          <ProductCard
            product={product}
            onPress={onProductPress}
            onAddToWishlist={onAddToWishlist}
            showBadges={showBadges}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: CONTAINER_PADDING,
    paddingBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginBottom: 16,
  },
});

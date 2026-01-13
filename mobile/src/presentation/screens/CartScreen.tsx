import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { useCart } from "../hooks/useCart";
import { Ionicons } from "@expo/vector-icons";
import { APP_COLORS } from "@/constants/appColors";

interface CartScreenProps {
  onCheckout: () => void;
}

export function CartScreen({ onCheckout }: CartScreenProps) {
  const { cart, loading, updateQuantity, removeItem, itemCount } = useCart();

  const [promoCode, setPromoCode] = useState("");

  if (loading && !cart) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={APP_COLORS.primary} />
      </View>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons name="cart-outline" size={64} color="#7C3AED" />
        </View>
        <Text style={styles.emptyTitle}>Votre panier est vide</Text>
        <Text style={styles.emptyText}>
          Ajoutez des produits pour commencer vos achats
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Cart Items */}
        {cart.items.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            {item.thumbnail ? (
              <Image
                source={{ uri: item.thumbnail }}
                style={styles.itemImage}
              />
            ) : (
              <View style={[styles.itemImage, styles.placeholderImage]}>
                <Ionicons
                  name="cart-outline"
                  size={32}
                  color={APP_COLORS.primary}
                />
              </View>
            )}

            <View style={styles.itemDetails}>
              <Text style={styles.itemTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.itemVariant}>{item.variantTitle}</Text>

              {/* Quantity controls */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => {
                    if (item.quantity > 1) {
                      updateQuantity(item.id, item.quantity - 1);
                    }
                  }}
                >
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.itemActionPrice}>
              {/* Remove button */}
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons
                  name="trash-outline"
                  style={styles.removeIcon}
                  size={20}
                />
              </TouchableOpacity>

              <Text style={styles.itemPrice}>
                {item.unitPrice.toLocaleString()}{" "}
                <Text style={styles.itemCurrency}>{cart.currency}</Text>
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Summary */}
      <View style={styles.bottomContainer}>
        {/* Promo Code */}
        <Text style={styles.promoTitle}>Vous avez un code promo ?</Text>
        <View style={styles.promoSection}>
          <TextInput
            style={styles.promoInput}
            placeholder="Exemple : 15LM5PM"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Appliquer</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>
            {cart.total.toLocaleString()}{" "}
            <Text style={styles.itemCurrency}>{cart.currency}</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={onCheckout}
          disabled={cart.total === 0}
        >
          <Text style={styles.checkoutButtonText}>Passer au paiement</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
    backgroundColor: "#fff",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  itemCount: {
    fontSize: 14,
    color: "#6B7280",
  },
  cartItem: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  placeholderImage: {
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 32,
  },
  itemDetails: {
    marginLeft: 12,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: APP_COLORS.primary,
    marginBottom: 8,
  },
  itemCurrency: {
    textTransform: "uppercase",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#0000007A",
    borderRadius: 20,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
  },
  removeButton: {
    padding: 8,
  },
  removeIcon: {
    fontSize: 20,
  },
  promoTitle: {
    fontSize: 15,
  },
  promoSection: {
    flexDirection: "row",
    marginVertical: 8,
  },
  promoInput: {
    flex: 1,
    height: 48,
    borderBottomWidth: 1,
    borderBottomColor: "#00000029",
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: "#6624830D",
  },
  applyButton: {
    paddingHorizontal: 20,
    justifyContent: "center",
    backgroundColor: APP_COLORS.primary,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  bottomContainer: {
    padding: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  summaryValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: APP_COLORS.primary,
  },
  checkoutButton: {
    backgroundColor: APP_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 16,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  itemActionPrice: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    flex: 1,
  },
  itemVariant: {
    fontSize: 12,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#6624831A",
    textAlign: "center",
  },
});

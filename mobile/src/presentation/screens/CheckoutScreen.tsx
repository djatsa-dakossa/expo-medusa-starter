import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useCart } from "../hooks/useCart";
import { useOrder } from "../hooks/useOrder";
import { CreateOrderRequest } from "../../domain/entities/Order";
import { APP_COLORS } from "@/constants/appColors";
import { AppSelect } from "../components/AppSelect";
import { useRegions } from "../hooks/useRegions";
import { useShippingOptions } from "../hooks/useShippingOptions";
import { usePaymentProviders } from "../hooks/usePaymentProviders";
import { useRouter } from "expo-router";

interface CheckoutScreenProps {
  onOrderComplete: (orderId: string) => void;
}

export function CheckoutScreen({ onOrderComplete }: CheckoutScreenProps) {
  const { cart } = useCart();
  const { createOrder, loading } = useOrder();
  const { countries } = useRegions();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Cotonou");
  const [country, setCountry] = useState("Bénin");
  const [postalCode, setPostalCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "bank_transfer" | "cash_on_delivery"
  >("card");
  const [promoCode, setPromoCode] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedShippingOption, setSelectedShippingOption] = useState<
    string | undefined
  >();

  const { shippingOptions, loading: shippingLoading } = useShippingOptions(
    cart?.id || null,
  );
  const { paymentProviders, loading: paymentLoading } =
    usePaymentProviders(selectedRegion);

  const handlePlaceOrder = async () => {
    if (!cart) {
      Alert.alert("Erreur", "Votre panier est vide");
      return;
    }

    if (!email || !firstName || !lastName || !address || !city) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs obligatoires");
      return;
    }

    try {
      const orderRequest: CreateOrderRequest = {
        cartId: cart.id,
        email,
        phone,
        shippingAddress: {
          firstName,
          lastName,
          address1: address,
          city,
          countryCode: "BJ", // Bénin
          postalCode,
          phone,
        },
        paymentMethod,
        promoCode: promoCode || undefined,
      };

      // TODO: Implement order creation at backend level
      // const order = await createOrder(orderRequest);
      // onOrderComplete(order.id);
      router.push('/order-success' as any);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de créer la commande");
    }
  };

  const handleSelectCountry = (countryId: string) => {
    setCountry(countryId);
    const country = countries.find((c) => c.id === countryId);
    if (!country) return;
    setSelectedRegion(country.regionId);
  };

  if (!cart) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Votre panier est vide</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de contact</Text>
          <TextInput
            style={styles.input}
            placeholder="Adresse mail *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Delivery Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de livraison</Text>
          <AppSelect
            placeholder="Pays *"
            value={country}
            onChange={handleSelectCountry}
            inputStyle={styles.input}
            options={countries.map((country) => ({
              label: country.name,
              value: country.id,
            }))}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Prénom *"
              value={firstName}
              onChangeText={setFirstName}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Nom *"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <AppSelect
            placeholder="Ville *"
            value={city}
            onChange={setCity}
            inputStyle={styles.input}
            options={[
              { label: "Cotonou", value: "cm" },
              { label: "Ouagadougou", value: "bf" },
            ]}
          />
          <TextInput
            style={styles.input}
            placeholder="Adresse *"
            value={address}
            onChangeText={setAddress}
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Numéro de téléphone *"
              value={postalCode}
              onChangeText={setPostalCode}
            />
          </View>
        </View>

        {/* Shipping Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Méthode de livraison</Text>
          <AppSelect
            placeholder="Mode de livraison"
            value={selectedShippingOption}
            onChange={setSelectedShippingOption}
            inputStyle={styles.input}
            options={shippingOptions.map((option) => ({
              label: `${option.name} (${option.amount} ${cart?.currency?.toUpperCase()})`,
              value: option.id,
            }))}
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Mode de paiement ({paymentProviders?.length}){" "}
          </Text>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "card" && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("card")}
          >
            <View style={styles.radio}>
              {paymentMethod === "card" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.paymentText}>Carte bancaire</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "paypal" && styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("paypal")}
          >
            <View style={styles.radio}>
              {paymentMethod === "paypal" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.paymentText}>PayPal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentOption,
              paymentMethod === "cash_on_delivery" &&
                styles.paymentOptionSelected,
            ]}
            onPress={() => setPaymentMethod("cash_on_delivery")}
          >
            <View style={styles.radio}>
              {paymentMethod === "cash_on_delivery" && (
                <View style={styles.radioSelected} />
              )}
            </View>
            <Text style={styles.paymentText}>Paiement à la livraison</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomContainer}>
        {/* Promo Code */}
        <View>
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
        </View>
        <TouchableOpacity
          style={[styles.placeOrderButton, loading && styles.buttonDisabled]}
          onPress={handlePlaceOrder}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.placeOrderText}>
              Payer
            </Text>
          )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: "#6B7280",
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 600,
    color: APP_COLORS.textBlack,
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderBottomWidth: 0.5,
    borderBottomColor: "#00000029",
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: "#0000000A",
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  halfInput: {
    flex: 1,
  },
  optionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  optionSubtitle: {
    fontSize: 12,
    color: "#6B7280",
  },
  optionPrice: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#10B981",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentOptionSelected: {
    borderColor: APP_COLORS.primary,
    backgroundColor: "#F5F3FF",
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: APP_COLORS.primary,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: APP_COLORS.primary,
  },
  paymentText: {
    fontSize: 14,
    color: "#1F2937",
  },
  promoRow: {
    flexDirection: "row",
    gap: 12,
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
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemCurrency: {
    textTransform: "uppercase",
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
    fontSize: 18,
    fontWeight: "bold",
    color: APP_COLORS.primary,
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
  placeOrderButton: {
    backgroundColor: APP_COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  placeOrderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
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
});

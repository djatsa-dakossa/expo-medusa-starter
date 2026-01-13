import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

interface OrderConfirmationScreenProps {
  orderNumber: string;
  loading?: boolean;
  onReturnHome: () => void;
}

export function OrderConfirmationScreen({
  orderNumber,
  loading,
  onReturnHome,
}: OrderConfirmationScreenProps) {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7C3AED" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.title}>Merci pour votre commande!</Text>
        <Text style={styles.message}>
          Votre commande a été passée avec succès
        </Text>

        {/* Order Number */}
        <View style={styles.orderNumberContainer}>
          <Text style={styles.orderNumberLabel}>Numéro de commande</Text>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
        </View>

        {/* Info Text */}
        <Text style={styles.infoText}>
          Un email de confirmation a été envoyé à votre adresse email avec les
          détails de votre commande.
        </Text>

        {/* Return to Home Button */}
        <TouchableOpacity style={styles.homeButton} onPress={onReturnHome}>
          <Text style={styles.homeButtonText}>Retourner à l'Accueil</Text>
        </TouchableOpacity>

        {/* View Order Button */}
        <TouchableOpacity style={styles.orderButton}>
          <Text style={styles.orderButtonText}>Voir ma commande</Text>
        </TouchableOpacity>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  successCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  checkmark: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  orderNumberContainer: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
  },
  orderNumberLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7C3AED',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  homeButton: {
    backgroundColor: '#7C3AED',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orderButton: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7C3AED',
  },
  orderButtonText: {
    color: '#7C3AED',
    fontSize: 16,
    fontWeight: '600',
  },
});

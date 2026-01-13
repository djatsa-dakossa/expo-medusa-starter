import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { OrderConfirmationScreen } from '@/src/presentation/screens/OrderConfirmationScreen';

export default function OrderConfirmationPage() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const router = useRouter();

  // Generate order number (in real app, this would come from the order entity)
  const orderNumber = `AFTFS${Math.floor(Math.random() * 1000000000)}`;

  const handleReturnHome = () => {
    router.replace('/' as any);
  };

  return (
    <OrderConfirmationScreen
      orderNumber={orderNumber}
      onReturnHome={handleReturnHome}
    />
  );
}

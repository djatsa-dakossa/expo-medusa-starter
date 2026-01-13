import React from 'react';
import { useRouter } from 'expo-router';
import { CheckoutScreen } from '@/src/presentation/screens/CheckoutScreen';

export default function CheckoutPage() {
  const router = useRouter();

  const handleOrderComplete = (orderId: string) => {
    router.replace({
      pathname: '/order-success' as any,
      params: { orderId },
    });
  };

  return <CheckoutScreen onOrderComplete={handleOrderComplete} />;
}

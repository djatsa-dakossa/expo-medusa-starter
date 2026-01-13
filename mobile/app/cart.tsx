import React from 'react';
import { useRouter } from 'expo-router';
import { CartScreen } from '@/src/presentation/screens/CartScreen';

export default function CartPage() {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout' as any);
  };

  return <CartScreen onCheckout={handleCheckout} />;
}

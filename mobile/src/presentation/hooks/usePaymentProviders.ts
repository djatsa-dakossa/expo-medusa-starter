import { useState, useEffect } from 'react';
import { MedusaPaymentProvider, IMedusaDataSource } from '@/src/data/datasources/IMedusaDataSource';
import { container } from '@/src/core/di/Container';

export interface PaymentProvider {
  id: string;
  isInstalled: boolean;
  displayName: string;
}

// Map of payment provider IDs to display names
const PROVIDER_DISPLAY_NAMES: { [key: string]: string } = {
  'manual': 'Paiement manuel',
  'stripe': 'Carte bancaire',
  'paypal': 'PayPal',
  'cash_on_delivery': 'Paiement à la livraison',
  'bank_transfer': 'Virement bancaire',
};

export function usePaymentProviders(regionId: string | null) {
  const [paymentProviders, setPaymentProviders] = useState<PaymentProvider[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!regionId) {
      setPaymentProviders([]);
      return;
    }

    const fetchPaymentProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const medusaDataSource = container.get<IMedusaDataSource>('MedusaDataSource');
        const response = await medusaDataSource.getPaymentProviders(regionId);

        console.log("response.payment_providers", response.payment_providers[0]);
        const mappedProviders: PaymentProvider[] = response.payment_providers
          .filter((provider: MedusaPaymentProvider) => provider.is_installed)
          .map((provider: MedusaPaymentProvider) => ({
            id: provider.id,
            isInstalled: provider.is_installed,
            displayName: PROVIDER_DISPLAY_NAMES[provider.id] || provider.id,
          }));

        setPaymentProviders(mappedProviders);
      } catch (err) {
        setError(err as Error);
        setPaymentProviders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentProviders();
  }, [regionId]);

  return { paymentProviders, loading, error };
}

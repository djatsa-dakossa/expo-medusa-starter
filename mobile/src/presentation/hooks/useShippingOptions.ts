import { useState, useEffect } from 'react';
import { MedusaShippingOption, IMedusaDataSource } from '@/src/data/datasources/IMedusaDataSource';
import { container } from '@/src/core/di/Container';

export interface ShippingOption {
  id: string;
  name: string;
  priceInclTax: number;
  amount: number;
  isReturn: boolean;
  adminOnly: boolean;
  providerId: string;
}

export function useShippingOptions(cartId: string | null) {
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!cartId) {
      setShippingOptions([]);
      return;
    }

    const fetchShippingOptions = async () => {
      setLoading(true);
      setError(null);
      console.log("fetchShippingOptions()");
      try {
        const medusaDataSource = container.get<IMedusaDataSource>('MedusaDataSource');
        const response = await medusaDataSource.getShippingOptions(cartId);

        const mappedOptions: ShippingOption[] = response.shipping_options
          .filter((option: MedusaShippingOption) => !option.admin_only && !option.is_return)
          .map((option: MedusaShippingOption) => ({
            id: option.id,
            name: option.name,
            priceInclTax: option.price_incl_tax,
            amount: option.amount,
            isReturn: option.is_return,
            adminOnly: option.admin_only,
            providerId: option.provider_id,
          }));

        setShippingOptions(mappedOptions);
      } catch (err) {
        setError(err as Error);
        setShippingOptions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchShippingOptions();
  }, [cartId]);

  return { shippingOptions, loading, error };
}

export interface ProductVariant {
  id: string;
  title: string;
  sku: string | null;
  inventoryQuantity?: number;
  allowBackorder: boolean;
  options: Array<{
    id: string;
    value: string;
    optionTitle: string;
  }>;
  price: number;
  currency: string;
}

export interface ProductOption {
  id: string;
  title: string;
  values: Array<{
    id: string;
    value: string;
  }>;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  handle: string;
  price: number;
  currency: string;
  imageUrl: string | null;
  thumbnail: string | null;
  images: Array<{
    id: string;
    url: string;
    rank: number;
  }>;
  available: boolean;
  weight: string | null;
  material: string | null;
  variants: ProductVariant[];
  options: ProductOption[];
  createdAt: Date;
  updatedAt: Date;
}

export enum PurchaseType {
  BUY = 'buy',
  RENT = 'rent',
}
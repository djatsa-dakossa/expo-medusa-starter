import { Product } from './Product';

export interface FlashSale {
  id: string;
  title: string;
  description?: string;
  endsAt: Date;
  discount: number;
  products: Product[];
  imageUrl?: string;
  isActive: boolean;
}

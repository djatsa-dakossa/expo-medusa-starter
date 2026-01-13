export interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  variantTitle: string;
  title: string;
  quantity: number;
  unitPrice: number;
  total: number;
  thumbnail: string | null;
}

export interface CartItemAdd {
  variantId: string;
  quantity: number;
}

export interface Cart {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartInitData {
  id: string;
  currency_code: string;

  original_item_total: number;
  original_item_subtotal: number;
  original_item_tax_total: number;

  item_total: number;
  item_subtotal: number;
  item_tax_total: number;

  original_total: number;
  original_subtotal: number;
  original_tax_total: number;

  total: number;
  subtotal: number;
  tax_total: number;

  discount_total: number;
  discount_tax_total: number;

  gift_card_total: number;
  gift_card_tax_total: number;

  shipping_total: number;
  shipping_subtotal: number;
  shipping_tax_total: number;

  original_shipping_total: number;
  original_shipping_subtotal: number;
  original_shipping_tax_total: number;
}

export interface CartInit {
  cart: CartInitData;
}
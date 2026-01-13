// Data Source Interface - defines how to interact with external API
export interface MedusaProduct {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  handle: string;
  is_giftcard: boolean;
  discountable: boolean;
  thumbnail: string | null;
  weight: string | null;
  length: string | null;
  height: string | null;
  width: string | null;
  material: string | null;
  collection_id: string | null;
  type_id: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  variants?: Array<{
    id: string;
    title: string;
    sku: string | null;
    barcode: string | null;
    inventory_quantity?: number;
    allow_backorder: boolean;
    manage_inventory: boolean;
    variant_rank: number;
    thumbnail: string | null;
    options: Array<{
      id: string;
      value: string;
      option_id: string;
      option: {
        id: string;
        title: string;
      };
    }>;
    prices?: Array<{
      amount: number;
      currency_code: string;
    }>;
  }>;
  images?: Array<{
    id: string;
    url: string;
    rank: number;
  }>;
  options?: Array<{
    id: string;
    title: string;
    values: Array<{
      id: string;
      value: string;
    }>;
  }>;
  tags?: Array<{
    id: string;
    value: string;
  }>;
  categories?: Array<{
    id?: string;
    name?: string;
    is_internal: boolean;
  }>;
}

export interface MedusaCart {
  id: string;
  items: Array<{
    id: string;
    variant_id: string;
    variant_title: string;
    title: string;
    quantity: number;
    unit_price: number;
    total: number;
    thumbnail: string | null;
  }>;
  subtotal: number;
  tax_total: number;
  total: number;
  region: {
    currency_code: string;
  };
  created_at: string;
  updated_at: string;
}

export interface IMedusaDataSource {
  // Products
  getProducts(params?: {
    limit?: number;
    offset?: number;
    category_id?: string[];
  }): Promise<{ products: MedusaProduct[]; count: number }>;

  getProduct(id: string): Promise<MedusaProduct>;

  getSimilarProducts(productId: string, limit?: number): Promise<{ products: MedusaProduct[] }>;

  searchProducts(query: string): Promise<{ products: MedusaProduct[] }>;

  // Cart
  createCart(): Promise<{ cart: MedusaCart }>;

  getCart(cartId: string): Promise<{ cart: MedusaCart }>;

  addLineItem(
    cartId: string,
    item: { variant_id: string; quantity: number }
  ): Promise<{ cart: MedusaCart }>;

  updateLineItem(
    cartId: string,
    lineId: string,
    quantity: number
  ): Promise<{ cart: MedusaCart }>;

  deleteLineItem(cartId: string, lineId: string): Promise<{ cart: MedusaCart }>;

  // Categories
  getCategories(): Promise<{ product_categories: any[] }>;

  getCategory(id: string): Promise<{ product_category: any }>;

  // Orders
  createOrder(cartId: string, data: {
    email: string;
    shipping_address: any;
    billing_address?: any;
  }): Promise<{ order: any }>;

  getOrder(id: string): Promise<{ order: any }>;

  // Regions and Checkout
  getRegions(): Promise<{ regions: MedusaRegion[] }>;

  getShippingOptions(cartId: string): Promise<{ shipping_options: MedusaShippingOption[] }>;

  getPaymentProviders(regionId: string): Promise<{ payment_providers: MedusaPaymentProvider[] }>;
}

export interface MedusaRegion {
  id: string;
  name: string;
  currency_code: string;
  tax_rate: number;
  countries: Array<{
    id: string;
    iso_2: string;
    iso_3: string;
    name: string;
    display_name: string;
    region_id: string;
  }>;
}

export interface MedusaShippingOption {
  id: string;
  name: string;
  price_incl_tax: number;
  amount: number;
  is_return: boolean;
  admin_only: boolean;
  provider_id: string;
  data: any;
}

export interface MedusaPaymentProvider {
  id: string;
  is_installed: boolean;
}

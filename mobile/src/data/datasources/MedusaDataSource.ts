// Concrete implementation of Medusa Data Source
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  IMedusaDataSource,
  MedusaProduct,
  MedusaCart,
} from './IMedusaDataSource';

export class MedusaDataSource implements IMedusaDataSource {
  private axiosInstance: AxiosInstance;

  constructor(private baseUrl: string) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': process.env.X_PUBLISHABLE_API_KEY || "pk_33fe8ab647f631671cd71efef5aa9c95420acb996b93cecb0729d53bd3ba0709",
      },
    });

    // Request interceptor for logging
    this.axiosInstance.interceptors.request.use(
      (config) => {
        console.log('API Request:', {
          method: config.method?.toUpperCase(),
          url: config.baseURL + config.url,
          params: config.params,
          data: config.data,
          headers: config.headers
        });
        return config;
      },
      (error) => {
        console.log('Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor for logging
    this.axiosInstance.interceptors.response.use(
      (response) => {
        console.log('API Response:', {
          status: response.status,
          statusText: response.statusText,
          data: response.data?.cart,
        });
        return response;
      },
      (error) => {
        console.log('Response Error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
        });
        return Promise.reject(error);
      }
    );
  }

  private async request<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.axiosInstance.request<T>({
      url: endpoint,
      ...config,
    });
    return response.data;
  }

  async getProducts(params?: {
    limit?: number;
    offset?: number;
    category_id?: string[];
  }): Promise<{ products: MedusaProduct[]; count: number }> {
    return this.request<{ products: MedusaProduct[]; count: number }>(
      '/store/products?fields=+variants.*,+variants.prices.*',
      {
        method: 'GET',
        params: {
          limit: params?.limit,
          offset: params?.offset,
          ...(params?.category_id && {
            'category_id[]': params.category_id,
          }),
        },
      }
    );
  }

  async getProduct(id: string): Promise<MedusaProduct> {
    const response = await this.request<{ product: MedusaProduct }>(
      `/store/products/${id}?fields=+variants.*,+variants.prices.*,+variants.options.*,+variants.options.option,+images.*,+options.*,+options.values,+categories.*,+tags.*,+collection_id`,
      { method: 'GET' }
    );
    return response.product;
  }

  async getSimilarProducts(
    productId: string,
    limit: number = 6
  ): Promise<{ products: MedusaProduct[] }> {
    // First, get the current product to extract its categories, tags, or collection
    const currentProduct = await this.getProduct(productId);

    // Build query params based on available product attributes
    const params: any = { limit };

    // Priority 1: Same collection
    if (currentProduct.collection_id) {
      params.collection_id = [currentProduct.collection_id];
    }
    // Priority 2: Same category
    else if (currentProduct.categories && currentProduct.categories.length > 0) {
      const categoryIds = currentProduct.categories
        .filter(cat => cat.id)
        .map(cat => cat.id as string);
      if (categoryIds.length > 0) {
        params['category_id[]'] = categoryIds;
      }
    }
    // Priority 3: Same type
    else if (currentProduct.type_id) {
      params.type_id = currentProduct.type_id;
    }

    const response = await this.request<{ products: MedusaProduct[]; count: number }>(
      '/store/products?fields=+variants.*,+variants.prices.*',
      {
        method: 'GET',
        params,
      }
    );

    // Filter out the current product from results
    const similarProducts = response.products.filter(p => p.id !== productId);

    return { products: similarProducts.slice(0, limit) };
  }

  async searchProducts(
    query: string
  ): Promise<{ products: MedusaProduct[] }> {
    return this.request<{ products: MedusaProduct[] }>(
      '/store/products',
      {
        method: 'GET',
        params: { q: query },
      }
    );
  }

  async createCart(): Promise<{ cart: MedusaCart }> {
    return this.request<{ cart: MedusaCart }>('/store/carts', {
      method: 'POST',
      data: {},
    });
  }

  async getCart(cartId: string): Promise<{ cart: MedusaCart }> {
    return this.request<{ cart: MedusaCart }>(`/store/carts/${cartId}`, {
      method: 'GET',
    });
  }

  async addLineItem(
    cartId: string,
    item: { variant_id: string; quantity: number }
  ): Promise<{ cart: MedusaCart }> {
    return this.request<{ cart: MedusaCart }>(
      `/store/carts/${cartId}/line-items`,
      {
        method: 'POST',
        data: item,
      }
    );
  }

  async updateLineItem(
    cartId: string,
    lineId: string,
    quantity: number
  ): Promise<{ cart: MedusaCart }> {
    return this.request<{ cart: MedusaCart }>(
      `/store/carts/${cartId}/line-items/${lineId}`,
      {
        method: 'POST',
        data: { quantity },
      }
    );
  }

  async deleteLineItem(
    cartId: string,
    lineId: string
  ): Promise<{ cart: MedusaCart }> {
    return this.request<{ cart: MedusaCart }>(
      `/store/carts/${cartId}/line-items/${lineId}`,
      {
        method: 'DELETE',
      }
    );
  }

  async getCategories(): Promise<{ product_categories: any[] }> {
    return this.request<{ product_categories: any[] }>(
      '/store/product-categories?fields=+product_category_image.*',
      { method: 'GET' }
    );
  }

  async getCategory(id: string): Promise<{ product_category: any }> {
    return this.request<{ product_category: any }>(
      `/store/product-categories/${id}`,
      { method: 'GET' }
    );
  }

  async createOrder(
    cartId: string,
    data: {
      email: string;
      shipping_address: any;
      billing_address?: any;
    }
  ): Promise<{ order: any }> {
    return this.request<{ order: any }>(`/store/carts/${cartId}/complete`, {
      method: 'POST',
      data,
    });
  }

  async getOrder(id: string): Promise<{ order: any }> {
    return this.request<{ order: any }>(`/store/orders/${id}`, {
      method: 'GET',
    });
  }

  async getRegions(): Promise<{ regions: any[] }> {
    return this.request<{ regions: any[] }>('/store/regions', {
      method: 'GET',
    });
  }

  async getShippingOptions(cartId: string): Promise<{ shipping_options: any[] }> {
    return this.request<{ shipping_options: any[] }>(
      '/store/shipping-options',
      {
        method: 'GET',
        params: { cart_id: cartId },
      }
    );
  }

  async getPaymentProviders(regionId: string): Promise<{ payment_providers: any[] }> {
    return this.request<{ payment_providers: any[] }>(
      '/store/payment-providers',
      {
        method: 'GET',
        params: { region_id: regionId },
      }
    );
  }
}

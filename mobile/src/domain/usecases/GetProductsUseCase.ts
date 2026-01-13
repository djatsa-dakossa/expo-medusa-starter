import { Product } from '../entities/Product';
import { IProductRepository } from '../repositories/IProductRepository';

export class GetProductsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(params?: {
    limit?: number;
    offset?: number;
    categoryId?: string;
  }): Promise<Product[]> {
    const limit = params?.limit && params.limit > 0 ? params.limit : 20;
    const offset = params?.offset && params.offset >= 0 ? params.offset : 0;

    const resp = this.productRepository.getProducts({
      ...params,
      limit,
      offset,
    });
    return resp;
  }
}

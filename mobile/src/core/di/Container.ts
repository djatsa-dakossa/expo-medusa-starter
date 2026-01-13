import { MedusaDataSource } from '../../data/datasources/MedusaDataSource';
import { ProductRepository } from '../../data/repositories/ProductRepository';
import { CartRepository } from '../../data/repositories/CartRepository';
import { CategoryRepository } from '../../data/repositories/CategoryRepository';
import { OrderRepository } from '../../data/repositories/OrderRepository';
import { GetProductsUseCase } from '../../domain/usecases/GetProductsUseCase';
import { AddToCartUseCase } from '../../domain/usecases/AddToCartUseCase';
import { GetCategoriesUseCase } from '../../domain/usecases/GetCategoriesUseCase';
import { CreateOrderUseCase } from '../../domain/usecases/CreateOrderUseCase';

class DIContainer {
  private static instance: DIContainer;
  private dependencies: Map<string, any> = new Map();

  private constructor() {
    this.registerDependencies();
  }

  static getInstance(): DIContainer {
    if (!DIContainer.instance) {
      DIContainer.instance = new DIContainer();
    }
    return DIContainer.instance;
  }

  private registerDependencies() {
    // Data Sources
    const medusaDataSource = new MedusaDataSource(
      'http://127.0.0.1:9000'
    );

    // Repositories
    const productRepository = new ProductRepository(medusaDataSource);
    const cartRepository = new CartRepository(medusaDataSource);
    const categoryRepository = new CategoryRepository(medusaDataSource);
    const orderRepository = new OrderRepository(medusaDataSource);

    // Use Cases
    const getProductsUseCase = new GetProductsUseCase(productRepository);
    const addToCartUseCase = new AddToCartUseCase(
      cartRepository,
      productRepository
    );
    const getCategoriesUseCase = new GetCategoriesUseCase(categoryRepository);
    const createOrderUseCase = new CreateOrderUseCase(orderRepository);

    // Register all dependencies
    this.dependencies.set('MedusaDataSource', medusaDataSource);
    this.dependencies.set('ProductRepository', productRepository);
    this.dependencies.set('CartRepository', cartRepository);
    this.dependencies.set('CategoryRepository', categoryRepository);
    this.dependencies.set('OrderRepository', orderRepository);
    this.dependencies.set('GetProductsUseCase', getProductsUseCase);
    this.dependencies.set('AddToCartUseCase', addToCartUseCase);
    this.dependencies.set('GetCategoriesUseCase', getCategoriesUseCase);
    this.dependencies.set('CreateOrderUseCase', createOrderUseCase);
  }

  get<T>(name: string): T {
    const dependency = this.dependencies.get(name);
    if (!dependency) {
      throw new Error(`Dependency ${name} not found`);
    }
    return dependency as T;
  }
}

export const container = DIContainer.getInstance();

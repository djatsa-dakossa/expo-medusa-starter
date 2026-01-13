# E-Commerce Mobile App - Expo & Medusa

A modern, full-featured e-commerce mobile application built with React Native (Expo) and Medusa.js backend. This project demonstrates clean architecture principles, responsive design, and seamless integration with a headless e-commerce platform.

## Features

### User Features
- **Product Browsing**: Browse products by categories with infinite scroll
- **Product Details**: Detailed product pages with image galleries, variants, and pricing
- **Shopping Cart**: Full cart management with quantity updates and item removal
- **Checkout Flow**: Multi-step checkout with shipping and payment options
- **Order Confirmation**: Success page with order details
- **Category Pages**: Dedicated category pages with banner carousel
- **Search**: Product search functionality
- **Favorites**: Wishlist feature (coming soon)
- **User Profile**: Profile management (coming soon)

### Technical Features
- **Clean Architecture**: Separation of concerns with data, domain, and presentation layers
- **Dependency Injection**: Centralized DI container for managing dependencies
- **Custom Hooks**: Reusable hooks for products, cart, regions, and orders
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Optimized for various screen sizes
- **State Management**: Efficient state management with React hooks
- **API Integration**: Full integration with Medusa.js store API
- **Image Optimization**: Optimized image loading with expo-image

## Project Structure

```
mobile/
├── app/                          # App routes (Expo Router)
│   ├── (tabs)/                  # Bottom tab navigation
│   │   ├── index.tsx           # Home/Shop screen
│   │   ├── cart.tsx            # Cart screen
│   │   ├── favorites.tsx       # Favorites screen
│   │   ├── profile.tsx         # Profile screen
│   │   └── _layout.tsx         # Tab layout configuration
│   ├── cart.tsx                # Cart page
│   ├── checkout.tsx            # Checkout page
│   ├── order-success.tsx       # Order confirmation page
│   ├── product/[id].tsx        # Product details page
│   ├── category/[id].tsx       # Category page
│   └── _layout.tsx             # Root layout
│
├── src/
│   ├── core/                   # Core utilities
│   │   └── di/                 # Dependency injection
│   │       └── Container.ts    # DI container
│   │
│   ├── data/                   # Data layer
│   │   ├── datasources/        # API data sources
│   │   │   ├── IMedusaDataSource.ts    # Interface
│   │   │   └── MedusaDataSource.ts     # Implementation
│   │   ├── mappers/            # Data mappers
│   │   │   ├── CartMapper.ts
│   │   │   ├── CategoryMapper.ts
│   │   │   ├── OrderMapper.ts
│   │   │   └── ProductMapper.ts
│   │   └── repositories/       # Repository implementations
│   │       ├── CartRepository.ts
│   │       ├── CategoryRepository.ts
│   │       ├── OrderRepository.ts
│   │       └── ProductRepository.ts
│   │
│   ├── domain/                 # Domain layer
│   │   ├── entities/           # Business entities
│   │   │   ├── Cart.ts
│   │   │   ├── Category.ts
│   │   │   ├── Order.ts
│   │   │   └── Product.ts
│   │   ├── repositories/       # Repository interfaces
│   │   │   ├── ICartRepository.ts
│   │   │   ├── ICategoryRepository.ts
│   │   │   ├── IOrderRepository.ts
│   │   │   └── IProductRepository.ts
│   │   └── usecases/          # Business logic
│   │       ├── AddToCartUseCase.ts
│   │       ├── CreateOrderUseCase.ts
│   │       ├── GetCategoriesUseCase.ts
│   │       └── GetProductsUseCase.ts
│   │
│   └── presentation/           # Presentation layer
│       ├── components/         # Reusable components
│       │   ├── AppSelect.tsx
│       │   ├── BannerCarousel.tsx
│       │   ├── CategoryCard.tsx
│       │   ├── ProductCard.tsx
│       │   └── ProductGrid.tsx
│       ├── hooks/              # Custom hooks
│       │   ├── useCart.ts
│       │   ├── useCategories.ts
│       │   ├── useOrder.ts
│       │   ├── usePaymentProviders.ts
│       │   ├── useProducts.ts
│       │   ├── useRegions.ts
│       │   └── useShippingOptions.ts
│       └── screens/            # Screen components
│           ├── CartScreen.tsx
│           ├── CategoryScreen.tsx
│           ├── CheckoutScreen.tsx
│           └── ProductDetailScreen.tsx
│
├── constants/                  # App constants
│   ├── appColors.ts           # Color theme
│   └── appAssets.ts           # Asset references
│
└── assets/                     # Static assets
    ├── images/
    └── logos/
```

## Architecture

This project follows **Clean Architecture** principles with three main layers:

### 1. Data Layer
- **DataSources**: Handle API communication with Medusa backend
- **Repositories**: Implement repository interfaces and use mappers
- **Mappers**: Convert API DTOs to domain entities

### 2. Domain Layer
- **Entities**: Core business models (Product, Cart, Order, etc.)
- **Repository Interfaces**: Define contracts for data access
- **Use Cases**: Encapsulate business logic

### 3. Presentation Layer
- **Screens**: Full-page components
- **Components**: Reusable UI components
- **Hooks**: Custom React hooks for state management

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- Medusa backend running (see backend setup)

### Installation

1. Install dependencies:
   ```bash
   cd mobile
   npm install
   ```

2. Configure the API endpoint:

   Update the Medusa API URL in `src/core/di/Container.ts`:
   ```typescript
   const medusaDataSource = new MedusaDataSource(
     'http://BACKEND_URL:9000'
   );
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on your device:
   - Scan the QR code with Expo Go app (Android/iOS)
   - Press `a` for Android emulator
   - Press `i` for iOS simulator
   - Press `w` for web browser

## Backend Setup

This app requires a Medusa backend. The backend should be running in the parent directory:

```bash
cd ../medusa
npm install
npm run dev
```

Make sure your Medusa backend is configured with:
- Store API enabled
- CORS configured for your mobile app
- Sample products and categories loaded

## API Integration

The app integrates with the following Medusa Store API endpoints:

- `GET /store/products` - List products
- `GET /store/products/:id` - Get product details
- `GET /store/product-categories` - List categories
- `POST /store/carts` - Create cart
- `POST /store/carts/:id/line-items` - Add to cart
- `GET /store/regions` - Get regions
- `GET /store/shipping-options` - Get shipping options
- `GET /store/payment-providers` - Get payment providers

## Key Features Implementation

### Product Listing
Products are fetched with pagination and filtering by category. The home screen displays all products in a grid layout with category filtering.

### Shopping Cart
Cart management uses Medusa's cart API with local storage persistence. Items can be added, updated, and removed with real-time price calculations.

### Checkout Flow
Multi-step checkout process includes:
1. Contact information
2. Shipping address
3. Shipping method selection
4. Payment method selection
5. Order confirmation

### Category Pages
Each category has a dedicated page with:
- Category name in header
- Banner carousel for promotions
- Filtered product grid

### Responsive Design
The app uses responsive layouts that adapt to different screen sizes with proper spacing and typography scaling.

## Theme & Styling

The app uses a consistent color scheme defined in `constants/appColors.ts`:
- Primary: `#662483` (Purple)
- Text colors: Black, gray variants
- Background: White and light gray

## Testing

To run the app in different environments:

```bash
# Development build
npx expo start

# Production build
npx expo build:android
npx expo build:ios
```

## Technologies Used

- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **Expo Router** - File-based routing
- **Axios** - HTTP client
- **Medusa.js** - Headless commerce backend
- **Expo Image** - Optimized image loading
- **Ionicons** - Icon library

## Contributing

This project follows a clean architecture pattern. When adding new features:

1. Define entities in the domain layer
2. Create repository interfaces
3. Implement repositories in the data layer
4. Create use cases for business logic
5. Build UI components and screens in the presentation layer
6. Register dependencies in the DI container

## License

This project is a test/demonstration project.

## Notes

- Some features (Favorites, Profile) are marked as "Under Construction"
- Payment processing is not fully implemented (placeholder)
- Real payment integration would require additional setup with payment providers

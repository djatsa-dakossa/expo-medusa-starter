import { HttpTypes } from "@medusajs/framework/types"
import { sdk } from "../sdk"

export const listCategories = async (query?: Record<string, any>) => {
  // ...
  return sdk.client
    .fetch<{ product_categories: HttpTypes.StoreProductCategory[] }>(
      "/store/product-categories",
      {
        query: {
          fields:
            "*category_children, *products, *parent_category, *parent_category.parent_category, *product_category_image",
          // ...
        },
        // ...
      }
    )
    // ...
}

export const getCategoryByHandle = async (categoryHandle: string[]) => {
  // ...

  return sdk.client
    .fetch<HttpTypes.StoreProductCategoryListResponse>(
      `/store/product-categories`,
      {
        query: {
          fields: "*category_children, *products, *product_category_image",
          // ...
        },
        // ...
      }
    )
    // ...
}
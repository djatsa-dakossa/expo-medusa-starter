export const defaultStoreProductCategoryFields = [
  "id",
  "name",
  "description",
  "handle",
  "parent_category_id",
  "rank",
  "created_at",
  "updated_at",
  "*product_category_image",
]

export const retrieveTransformQueryConfig = {
  defaults: defaultStoreProductCategoryFields,
  isList: false,
}

export const listTransformQueryConfig = {
  defaults: defaultStoreProductCategoryFields,
  isList: true,
}

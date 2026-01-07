import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { listTransformQueryConfig } from "./query-config"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const remoteQuery = req.scope.resolve("remoteQuery")

  const queryObject = {
    entryPoint: "product_category",
    fields: req.queryConfig?.fields?.length 
      ? req.queryConfig.fields 
      : listTransformQueryConfig.defaults,
    variables: {
      filters: req.filterableFields,
      ...req.queryConfig.pagination,
    },
  }

  const { rows: product_categories, metadata } = await remoteQuery(queryObject)
  
  res.json({
    product_categories,
    page: metadata.page,
    page_count: metadata.page_count,
    total: metadata.total,
  })
}

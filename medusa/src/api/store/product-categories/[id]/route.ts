import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { retrieveTransformQueryConfig } from "../query-config"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params

  const remoteQuery = req.scope.resolve("remoteQuery")

  const [category] = await remoteQuery({
    entryPoint: "product_category",
    fields: retrieveTransformQueryConfig.defaults,
    variables: {
      filters: { id },
    },
  })

  res.json({ product_category: category })
}

import endpoints from '~/constants/endpoints'
import type { ProductList, ProductListConfig, Product } from '~/types/product.type'
import type { SuccessResponse } from '~/types/utils.types'
import http from '~/utils/http'

export const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(endpoints.product.products, { params })
  },
  getProductdetail(id: string) {
    return http.get<SuccessResponse<Product>>(endpoints.product.product(id))
  }
}

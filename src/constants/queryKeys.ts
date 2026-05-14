import type { ProductListConfig } from '~/types/product.type'

export const QUEYR_KEY = {
  products: {
    all: ['products'],
    list: (queryParams: any) => ['products', queryParams]
  }
}

import { useQuery } from '@tanstack/react-query'
import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProductList from './components/SortProductList'
import { QUEYR_KEY } from '~/constants/queryKeys'
import useQueryParams from '~/hooks/useQueryParams'
import { productApi } from '~/apis/product.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const { data } = useQuery({
    queryKey: QUEYR_KEY.products.list({ queryParams }),
    queryFn: () => {
      return productApi.getProducts(queryParams)
    }
  })

  console.log(data)
  return (
    <div className='bg-background py-6'>
      <div className='container '>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3 mr-4'>
            <AsideFilter />
          </div>
          <div className='col-span-9'>
            <SortProductList />
            <div className='mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
              {Array(30)
                .fill(0)
                .map((_, index) => (
                  <div className='col-span-1' key={index}>
                    <Product />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

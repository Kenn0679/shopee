const endpoints = {
  auth: {
    login: '/login',
    register: '/registerr',
    logout: '/logout',
    refreshToklen: '/refresh-access-token'
  },
  user: {
    me: '/me',
    uploadAvatar: '/upload-avatar'
  },
  product: {
    categories: '/categories',
    products: '/products', //can query param for more infor
    product: (id: number | string) => `/products/${id}`
  },
  purchase: {
    addToCart: '/purchases/add-to-cart',
    purchases: '/purchases', //get status, history, etc
    updatePurchase: '/purchases/update-purchase',
    buyProdcuts: '/purchases/buy-products'
  }
}

export default endpoints

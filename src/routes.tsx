import { createBrowserRouter } from 'react-router'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'

const router = createBrowserRouter([
  {
    path: '/',
    Component: ProductList
  },
  {
    Component: RegisterLayout,
    children: [
      {
        path: '/login',
        Component: Login
      },
      {
        path: '/register',
        Component: Register
      }
    ]
  }
])

export default router

import { createBrowserRouter, Navigate, Outlet } from 'react-router'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { AuthContext } from './contexts/auth.context'
import { useContext, useEffect } from 'react'
import { toast } from 'react-toastify'
import endpoints from './constants/endpoints'

// Định nghĩa một component để bảo vệ các route cần xác thực
const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('Bạn cần đăng nhập để truy cập trang này')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isAuthenticated ? <Outlet /> : <Navigate to={endpoints.auth.login} />
}

// Định nghĩa một component để ngăn chặn người dùng đã đăng nhập truy cập vào trang đăng nhập và đăng ký (obviously cuz they already logged in)
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    if (isAuthenticated) {
      toast.error('Bạn đã đăng nhập rồi')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return !isAuthenticated ? <Outlet /> : <Navigate to={endpoints.home} />
}

const router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        path: '',
        Component: ProductList
      }
    ]
  },
  {
    Component: RejectedRoute,
    children: [
      {
        Component: RegisterLayout,
        children: [
          {
            path: endpoints.auth.login,
            Component: Login
          },
          {
            path: endpoints.auth.register,
            Component: Register
          }
        ]
      }
    ]
  },
  {
    path: '',
    Component: ProtectedRoute,
    children: [
      {
        Component: MainLayout,
        children: [
          {
            path: endpoints.user.me,
            Component: ProductList
          }
        ]
      }
    ]
  }
])

export default router

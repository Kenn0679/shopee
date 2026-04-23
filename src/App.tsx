import { RouterProvider } from 'react-router/dom'
import router from './routes'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme='light'
        transition={Bounce}
      />
      <RouterProvider router={router} />
    </>
  )
}

export default App

import { Outlet } from 'react-router'
import Footer from '~/components/Footer'
import RegisterHeader from '~/components/RegisterHeader'

export default function RegisterLayout() {
    return (
        <>
            <RegisterHeader />
            <Outlet />
            <Footer />
        </>
    )
}

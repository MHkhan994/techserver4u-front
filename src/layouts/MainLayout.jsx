import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/Header'
import { updateCart } from '@/redux/reducers/cartSlice'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


const MainLayout = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart'))
        if (cartItems && cartItems.length > 0) {
            dispatch(updateCart(cartItems))
        }
    }, [])

    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default MainLayout
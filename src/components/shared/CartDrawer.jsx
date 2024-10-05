import { removeFromCart, setCartOpen } from '@/redux/reducers/cartSlice'
import { Divider, Drawer } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux'
import { IoClose } from "react-icons/io5";

const CartDrawer = () => {
    const { cartItems, cartOpen } = useSelector(s => s.cart)
    const dispatch = useDispatch()
    const [tax, setTax] = useState(0)
    const [subTotal, setSubTotal] = useState(0)
    const [total, setTotal] = useState(0)

    const removeCart = (id) => {
        dispatch(removeFromCart(id))
    }

    useEffect(() => {

        setTotal(0)
        setSubTotal(0)
        setTax(0)

        if (cartItems) {
            cartItems.forEach(item => {
                setTax(prev => prev + item.tax)
                setSubTotal(prev => prev + (item.price * item.quantity))
            });
        }
    }, [cartItems])

    useEffect(() => {
        setTotal(tax + subTotal)
    }, [subTotal, tax])

    return (
        <div className="cart">
            <button onClick={() => dispatch(setCartOpen(true))} className='nav_button cart_button'>
                <HiOutlineShoppingCart size={24} />
                <span>{cartItems.length}</span>
            </button>

            <Drawer
                className={'cart_drawer'}
                open={cartOpen}
                width={500}
                title={<h2 className="text-lg">My Cart</h2>}
                placement={'right'}
                onClose={() => dispatch(setCartOpen(false))}
            >
                {
                    cartItems.length > 0 ?
                        <div className='cart_data_wrapper'>
                            <div className="flex flex-col gap-3">
                                {
                                    cartItems.map(product => <div className="cart_product_card" key={product.productId}>
                                        <Image className="cart_item_img" src={product?.thumbnail} height={200} width={200} alt="cart item image" />
                                        <div className="flex flex-col gap-3">
                                            <h3>{product?.name}</h3>
                                            <p>${product?.price} x {product?.quantity}</p>
                                            <div className="flex gap-2 items-center">
                                                {
                                                    product?.attributes.length > 0 && product?.attributes?.map(attr => {
                                                        return <p key={attr.name}>{attr.name}: {attr.value}</p>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <button onClick={() => removeCart(product.productId)} className="remove_item_button">
                                            <IoClose size={20} />
                                        </button>
                                    </div>
                                    )
                                }
                            </div>
                            <div>
                                <h4 className="flex justify-between">Sub total: <span className="text-primary">${subTotal}</span></h4>
                                <Divider style={{ margin: "10px 0" }} />
                                <h4 className="flex justify-between">Tax: <span className="text-primary">${tax}</span></h4>
                                <Divider style={{ margin: "10px 0" }} />
                                <h4 className="flex justify-between">Total: <span className="text-primary">${total}</span></h4>

                                <button className="primary_btn checkout_btn">Checkout</button>
                            </div>
                        </div> :

                        <div className="empty-cart">
                            <h2>Cart is empty</h2>
                        </div>
                }
            </Drawer>
        </div>
    )
}

export default CartDrawer
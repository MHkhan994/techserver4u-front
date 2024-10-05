const { createSlice } = require("@reduxjs/toolkit")

const initialState = {
    cartItems: [],
    cartOpen: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {

            const item = action.payload

            const exists = state.cartItems.find(cartItem => cartItem?.productId === item.productId)

            if (!exists) {
                state.cartItems.push(action.payload)
            }

            else {
                const qty = exists.quantity
                item.quantity = item.quantity + qty
                state.cartItems = state.cartItems.filter(item => item.productId !== exists.productId)
                state.cartItems.push(item)
            }

            state.cartOpen = true

        },
        updateCart: (state, action) => {
            state.cartItems = action.payload
        },
        setCartOpen: (state, action) => {
            state.cartOpen = action.payload
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(item => item.productId !== action.payload)
        }
    }
})


export const { addToCart, updateCart, setCartOpen, removeFromCart } = cartSlice.actions

const cartReducer = cartSlice.reducer

export default cartReducer
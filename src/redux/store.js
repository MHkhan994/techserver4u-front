import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './reducers/cartSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const cartPersistedReducer = persistReducer(persistConfig, cartReducer)

export const store = configureStore({
    reducer: {
        cart: cartPersistedReducer
    },
})

export const persistor = persistStore(store)
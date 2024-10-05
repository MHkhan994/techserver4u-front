import MainLayout from '@/layouts/MainLayout'
import { persistor, store } from '@/redux/store'
import '@/styles/main.scss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }) {
  return <Provider store={store}>

    <PersistGate persistor={persistor}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </PersistGate>
  </Provider>
}

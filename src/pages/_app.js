import MainLayout from '@/layouts/MainLayout'
import { persistor, store } from '@/redux/store'
import '@/styles/main.scss'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'

export default function App({ Component, pageProps }) {


  return <Provider store={store}>
    <Toaster position="top-center" richColors />
    <PersistGate persistor={persistor}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </PersistGate>
  </Provider>
}

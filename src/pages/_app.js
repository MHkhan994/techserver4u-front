import MainLayout from '@/layouts/MainLayout'
import { store } from '@/redux/store'
import '@/styles/main.scss'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }) {
  return <Provider store={store}>
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  </Provider>
}

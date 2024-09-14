import BasicServices from '@/components/homepage/BasicServices'
import FeaturedProducts from '@/components/homepage/FeaturedProducts'
import HomeSlider from '@/components/homepage/HomeSlider'
import LatestProducts from '@/components/homepage/LatestProducts'
import ProductByCategory from '@/components/homepage/ProductByCategory'
import ShopByCategory from '@/components/homepage/ShopByCategory'
import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <HomeSlider />

        <BasicServices />
        <FeaturedProducts />

        <LatestProducts />

        <ShopByCategory />

        <ProductByCategory />
      </main>
    </>
  )
}

import ProductTop from '@/components/product/ProductTop'
import axios from 'axios'
import React from 'react'

const ProductDetails = ({ product }) => {

    console.log(product)

    return (
        <div>
            <ProductTop product={product} />
        </div>
    )
}

export default ProductDetails


export const getServerSideProps = async (ctx) => {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${ctx.query?.slug}`)
        return {
            props: { product: res.data.product }
        }
    }
    catch (err) {
        console.log(err)
    }
}




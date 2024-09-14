import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

const SingleCategoryProduct = ({ category }) => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/productbycat/${category.slug}`)
            .then(res => {
                console.log(res.data)
                if (res.data.products) {
                    setProducts(res.data.products)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [category.slug])

    console.log(products)

    return (
        <>
            {
                products.length > 0 && <div className='main_container'>
                    <h3 className="home_section_title text-start">{category?.name}</h3>
                    <div className='product_container'>
                        {
                            products.map(product => <ProductCard key={product?._id} product={product} />)
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default SingleCategoryProduct
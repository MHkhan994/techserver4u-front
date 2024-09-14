import React, { useEffect, useState } from 'react'
import SingleCategoryProduct from './SingleCategoryProduct'
import axios from 'axios'

const ProductByCategory = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/getcategory`)
            .then(res => {
                if (res.data) {
                    setCategories(res.data.categories)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    console.log(categories)

    return (
        <div>
            {
                categories.length > 0 && categories.map(category => <SingleCategoryProduct key={category._id} category={category} />)
            }
        </div>
    )
}

export default ProductByCategory
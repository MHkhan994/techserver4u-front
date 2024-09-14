import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const ShopByCategory = () => {
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

    return (
        <div className="main_container shop-by-category">
            <div className='titles'>
                <h3 className='home_section_title'>Shop By Category</h3>
                <button className='primary_btn'>View More</button>
            </div>


            <div className='categories-container'>
                {
                    categories.length !== 0 && categories.slice(0, 11).map((item, index) => {
                        return (
                            <div key={index} >
                                <div onClick={() => Router.push(`/`)} className="category-card">
                                    <Image src={item.categoryImage ? item.categoryImage : "https://via.placeholder.com/200"} height={200} width={200} alt='category card image' />
                                    <p className='name'>{item.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShopByCategory
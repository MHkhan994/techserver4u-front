import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import { Autoplay, FreeMode, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';
import Image from 'next/image';

const FeaturedProducts = () => {

    const [products, setProducts] = useState([])

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/getFeatured`)
            .then(res => {
                if (res.data.success) {
                    setProducts(res.data.products)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <>
            {
                products.length !== 0 ? <div className='featured_product main_container'>
                    <h2 className='home_section_title'>Featured Products</h2>

                    <div className="swiper_container">
                        <Swiper
                            breakpoints={{
                                0: {
                                    slidesPerView: 1
                                },
                                560: {
                                    slidesPerView: 2
                                },
                                860: {
                                    slidesPerView: 3
                                },
                                1200: {
                                    slidesPerView: 4
                                },
                                1440: {
                                    slidesPerView: 5
                                }
                            }}
                            navigation={{
                                nextEl: '#featured_product_nextEl',
                                prevEl: '#featured_product_prevEl'
                            }}
                            modules={[Navigation, FreeMode, Autoplay]}
                            loop={true}
                            freeMode={true}
                            className="mySwiper"
                            autoplay={{
                                delay: 3000
                            }}
                            slidesPerView={5}
                            spaceBetween={20}
                        >

                            {
                                products?.length > 0 && products.map(product => <SwiperSlide key={product?._id}>
                                    <ProductCard product={product} />
                                </SwiperSlide>)
                            }
                        </Swiper>
                        <div className='navigation_buttons'>
                            <button id='featured_product_prevEl'>
                                <div className='image'>
                                    <Image src={'/svgs/home/nextEl.svg'} height={30} width={30} alt="next button" />
                                </div>
                            </button>
                            <button id='featured_product_nextEl'>
                                <div className='image'>
                                    <Image src={'/svgs/home/prevEl.svg'} height={30} width={30} alt="prev button" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div> : <></>
            }
        </>
    )
}

export default FeaturedProducts
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const HomeSlider = () => {

    const [sliders, setSliders] = useState([])


    useEffect(() => {
        axios.get(`https://staging-be-ecom.techserve4u.com/api/settings/getsliders`)
            .then(res => {
                console.log(res.data)
                setSliders(res.data.sliders)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    return (
        <div className='home_slider main_container'>
            <Swiper
                pagination={{
                    dynamicBullets: true,
                    clickable: true
                }}
                autoplay={
                    {
                        delay: 3000
                    }
                }
                loop={true}
                modules={[Pagination, Autoplay]}
                className="mySwiper">
                {
                    sliders?.map((slider, i) => {
                        return <SwiperSlide key={i}>
                            {/* <Image src={slider?.image} fill alt={slider.title} className='slider_img' /> */}
                            <img src={slider?.image} alt="" className='slider_img' />
                        </SwiperSlide>
                    })
                }
            </Swiper>
        </div>
    )
}

export default HomeSlider
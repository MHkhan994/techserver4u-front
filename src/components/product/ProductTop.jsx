import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';

const ProductTop = ({ product }) => {

    const [imageGallery, setImageGallery] = useState(product?.gallery || [])
    const [activeImage, setActiveImage] = useState(null)


    useEffect(() => {
        if (product) {
            setImageGallery([product?.thumbnail])

            setImageGallery(prev => [...prev, ...product?.gallery])
            setActiveImage(imageGallery[0])
        }
    }, [product])

    return (
        <div className='single_product_top'>
            <div className='main_container product_main'>
                <div className='image_gallery'>
                    <div className='small_images'>
                        {
                            imageGallery.slice(0, 4).map(image => <div onClick={() => setActiveImage(image)} key={image} className={`img_card ${activeImage === image && 'active-card'}`}>
                                <Image src={image} height={100} width={100} alt='product image' />
                            </div>)
                        }
                    </div>
                    <div className='large_image'>
                        <InnerImageZoom src={activeImage} zoomSrc={activeImage} zoomType='hover' />
                    </div>
                </div>
                <div className='details'></div>
            </div>
        </div>
    )
}

export default ProductTop
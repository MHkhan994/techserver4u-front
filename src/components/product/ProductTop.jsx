import { Divider, Rate } from 'antd';
import dynamic from 'next/dynamic';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import HtmlParser from 'react-html-parser';
import InnerImageZoom from 'react-inner-image-zoom'
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { RiShoppingCartLine } from "react-icons/ri";
import { LiaCubeSolid } from "react-icons/lia";


const ProductTop = ({ product }) => {

    const [imageGallery, setImageGallery] = useState(product?.gallery || [])
    const [activeImage, setActiveImage] = useState(null)
    const [price, setPrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [discountType, setDiscountType] = useState('')
    const [attributes, setAttributes] = useState([])
    const [stock, setStock] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])


    useEffect(() => {
        if (attributes.length > 0 && product) {
            const selectedVarient = product?.variations?.find(variation => {
                return attributes.every(attr => {
                    return variation[attr.name] === attr.value;
                });
            })

            console.log(selectedVarient)

            if (selectedVarient) {
                setPrice(selectedVarient.price)
                setDiscount(selectedVarient.discount)
                setDiscountType(selectedVarient.discountType)
                setStock(selectedVarient.stock)
            }

            setQuantity(1)
        }
    }, [attributes, product])


    useEffect(() => {
        if (product) {
            setImageGallery([product?.thumbnail])

            setImageGallery(prev => [...prev, ...product?.gallery])
            setActiveImage(imageGallery[0])

            setPrice(product?.price)
            setDiscount(product.discount.value)
            setDiscountType(product?.discount?.discountType)
            setStock(product.stock)
        }
    }, [product])


    const checkValue = (name, value) => {
        const exist = attributes.find(attr => attr.name === name)
        if (exist) {
            if (exist.value === value) {
                return true
            }
            else {
                return false
            }
        }
    }


    const handleAttrChange = (name, value) => {
        const exist = attributes.find(attr => attr.name === name)
        if (exist) {
            const updatedAttribute = attributes.map(attr => {
                if (attr.name === name) {
                    return {
                        name,
                        value
                    }
                }
                else {
                    return attr
                }
            })

            setAttributes(updatedAttribute)
        }

        else {
            setAttributes(prev => [...prev, { name, value }])
        }

    }


    const decreaseQuantity = () => {
        if (quantity <= 1) {
            return
        }
        setQuantity(prev => prev - 1)
    }

    const increaseQuantity = () => {
        if (quantity >= stock) {
            return
        }
        setQuantity(prev => prev + 1)
    }


    if (!isClient) {
        return <></>
    }

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
                <div className='details'>
                    <h2 className='title'>{product?.name}</h2>

                    <div className='rating'>
                        <Rate disabled style={{ fontSize: '24px' }} defaultValue={product?.ratingCount} />
                        <p>({product?.ratingCount ?? 0}/5)</p>
                    </div>

                    <div className='price'>
                        {
                            discount > 0 ? <>
                                {
                                    discountType === 'flat' ? <span className='new_price'>
                                        ${price - discount}
                                    </span>
                                        :
                                        <span className='new_price'>
                                            $ {
                                                price - Math.floor(price * discount / 100)
                                            }
                                        </span>
                                }
                                <span className='old_price'>
                                    ${price}
                                </span>
                            </>
                                :
                                <span className='new_price'>${price}</span>
                        }

                        {
                            discount > 0 && <div className='discount'>
                                {
                                    discountType === 'flat' ? <span>${discount} off</span> : <span>{discount}% off</span>
                                }
                            </div>
                        }
                    </div>

                    <p>
                        {HtmlParser(product.description || "")}
                    </p>

                    <Divider style={{ margin: '0px' }} />

                    {
                        product?.productType === 'variant' && product?.attributes?.length > 0 && product.attributes.map(attr => {
                            return <div className='attribute' key={attr.name}>
                                <p>{attr?.name}</p>
                                <div className='attr_value_wrapper'>
                                    {
                                        attr.values?.map(value => {
                                            return <button onClick={() => handleAttrChange(attr.name, value)} key={value} className={`attr_value ${checkValue(attr.name, value) && 'active_attr'}`}>
                                                {value}
                                            </button>
                                        })
                                    }
                                </div>

                                <Divider style={{ margin: '15px 0 0 0' }} />
                            </div>
                        })
                    }

                    <div className='quantity_wrapper'>
                        <p>Quantity</p>
                        <div className="flex gap-4 items-center">
                            <div className='quantity'>
                                <button disabled={quantity <= 1} onClick={decreaseQuantity}>
                                    <LuMinus />
                                </button>
                                <p>{quantity}</p>
                                <button disabled={quantity >= stock} onClick={increaseQuantity}>
                                    <FiPlus />
                                </button>

                            </div>
                            <h2 className='stock text-base'>
                                {
                                    stock !== 0 ? ` Products left: ${stock}` : <span className='text-red'>Out of Stock</span>
                                }
                            </h2>
                        </div>
                    </div>
                    <div className='action-buttons'>
                        <button className='primary_btn'><RiShoppingCartLine size={20} /> Add to Cart</button>
                        <button className='secondary_btn'> <LiaCubeSolid size={22} /> Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductTop
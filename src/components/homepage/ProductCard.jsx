import { Divider } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({ product }) => {


    return (
        <div className='product_card'>
            <Link
                href={`/product/${product._id}`}
                className='product_image'
            >
                <div>
                    <Image src={product?.thumbnail}
                        height={250}
                        width={200}
                        alt={`product ${product.name}`}
                    />
                </div>
            </Link>

            <div>
                <h4 className='title'>{product?.name}</h4>
                <Divider />

                <div className='product-price'>
                    <div>
                        {
                            product.discount.value > 0 ? <div>
                                {
                                    product?.discount?.discountType === "flat" && <h2 className='price'>${product?.price - product?.discount?.value}
                                        <span className='old_price'>${product?.price}</span>
                                    </h2>
                                }
                                {
                                    product?.discount?.discountType === 'percent' && <h2 className='price'>
                                        {
                                            product?.price - Math.floor(product.price * (product?.discount?.value / 100))
                                        }
                                        <span className='old_price'>${product?.price}</span>
                                    </h2>
                                }
                            </div> :

                                <h2 className='price'>${product?.price}</h2>
                        }
                    </div>
                    <div className='rating'>
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.48862 12.4684C8.18515 12.2985 7.81521 12.2985 7.51173 12.4684L4.60214 14.0971C3.85754 14.5139 2.96658 13.8666 3.13286 13.0296L3.78261 9.75904C3.85037 9.41792 3.73604 9.06608 3.48069 8.82997L1.03224 6.56592C0.405704 5.98657 0.74598 4.93916 1.59338 4.83866L4.90487 4.44592C5.2502 4.40496 5.54946 4.18754 5.69513 3.87176L7.09214 0.843402C7.44957 0.0685822 8.55079 0.0685822 8.90822 0.843402L10.3052 3.87176C10.4509 4.18754 10.7502 4.40496 11.0955 4.44592L14.407 4.83866C15.2544 4.93916 15.5947 5.98657 14.9681 6.56592L12.5197 8.82997C12.2643 9.06608 12.15 9.41792 12.2178 9.75904L12.8675 13.0296C13.0338 13.8666 12.1428 14.5139 11.3982 14.0971L8.48862 12.4684Z" fill="#FBBC05" />
                        </svg>
                        ({product?.ratingCount})
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
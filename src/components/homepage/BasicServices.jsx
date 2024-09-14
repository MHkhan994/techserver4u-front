import basicServices from '@/static/basicServices'
import Image from 'next/image'
import React from 'react'

const BasicServices = () => {
    return (
        <div className='basic-services main_container'>
            {
                basicServices.map(service => <div key={service?.id} className='info_item'>
                    <div className='icon'>
                        <Image src={service.icon} height={35} width={35} alt='basic service card icon' />
                    </div>
                    <div className='text'>
                        <p>{service?.title}</p>
                        <h2>{service?.status}</h2>
                    </div>
                </div>)
            }
        </div>
    )
}

export default BasicServices
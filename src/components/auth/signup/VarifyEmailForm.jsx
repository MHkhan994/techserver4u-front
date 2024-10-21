import { Flex, Input } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const VarifyEmailForm = () => {

    const [otp, setOtp] = useState('')
    const [email, setEmail] = useState('')
    const router = useRouter()

    useEffect(() => {
        if (router.query.email) {
            setEmail(router.query.email)
        }
    }, [router])

    const handleVerify = () => {
        const payload = {
            email,
            otp
        }
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/verifyOtp`, payload)
            .then(res => {
                if (res?.data?.success) {
                    toast.success('Email verification successfull')
                    router.push('/signin')
                }
            })
            .catch(err => {
                console.log(err)
                toast.error(err?.response?.data?.message || 'Email verification failed')
            })
    }


    return (
        <div className='auth-form-wrapper'>
            <div className='auth-form'>
                <h2 className='text-center '>Verification</h2>
                <p className='text-center mb-10'>Enter the 6-digit code that we sent to s********0@gmail.com</p>

                <Flex justify='center' className='pt-3'>
                    <Input.OTP length={6} size="large" className='otp_input' onChange={value => setOtp(value)} />
                </Flex>

                <button onClick={handleVerify} className='primary_btn'>Submit</button>
            </div>
        </div>
    )
}

export default VarifyEmailForm
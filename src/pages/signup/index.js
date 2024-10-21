import SignupFrom from '@/components/auth/signup/SignupFrom'
import { toast } from 'sonner'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const SignUp = () => {

    const [tab, setTab] = useState('register')

    const router = useRouter()

    useEffect(() => {
        if (router.query.tab) {
            setTab(router.query.tab)
        }
    }, [router])

    const onFinish = (values) => {
        console.log('Success:', values);
        const payload = {
            name: values.name,
            email: values.email,
            password: values.password
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signup`, payload)
            .then(res => {
                console.log(res.data)
                if (res.data.isOtpSend) {
                    router.push('/signup?tab=varify')
                    toast.success('User registered successfully')
                }
            })
            .catch(err => {
                toast.error(err?.response?.data?.message || 'Registration failed')
            })
    };

    return (
        <div className='auth-container'>
            {
                tab === 'register' ? <SignupFrom onFinish={onFinish} /> : <div></div>
            }
        </div>
    )
}

export default SignUp
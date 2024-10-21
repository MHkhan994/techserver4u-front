import SignupFrom from '@/components/auth/signup/SignupFrom'
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

    return (
        <div className='auth-container'>
            {
                tab === 'register' ? <SignupFrom /> : <div></div>
            }
        </div>
    )
}

export default SignUp
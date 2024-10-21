import { Divider, Form, Input } from 'antd'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MdLockOpen } from 'react-icons/md'
import { TbMail } from 'react-icons/tb'
import { toast } from 'sonner'

const SignIn = () => {

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const router = useRouter()


    const handleLogin = (values) => {
        console.log(values)

        const payload = {
            email: values.email,
            password: values.password
        }

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/signin`, payload)
            .then(res => {
                if (res.data) {
                    toast.success('Login successfull, welcome back')
                    router.push('/')
                }
            })
            .catch(err => {
                toast.error(err?.response?.data?.message || 'Login failed')
            })
    }

    return (
        <div className='auth-container'>
            <div className='auth-form-wrapper'>
                <Form
                    className='auth-form'
                    onFinish={handleLogin}
                    onFinishFailed={onFinishFailed}
                    name='register-form'
                >

                    <h2 className='text-center'>Login</h2>
                    <p className='text-center mb-10'>To stay connected with us, please registration.</p>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: 'email',
                                message: "Not a valid email"
                            }
                        ]}
                    >
                        <Input prefix={<TbMail size={20} />} type='email' placeholder='Enter email' className='default_input'></Input>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Password should be longer then 6 characters'
                            }
                        ]}
                    >
                        <Input prefix={<MdLockOpen size={20} />} type='password' placeholder='Enter password' className='default_input'></Input>
                    </Form.Item>

                    <button className='primary_btn'>Login</button>
                    <Divider plain>Or Register With</Divider>

                    <button type='button' className='primary_btn google_btn'>Continue with Google</button>

                    <h5 className='text-center'>Don&apos;t have an account? <Link href={'/signup'}>register</Link></h5>
                </Form>

            </div>
        </div>
    )
}

export default SignIn
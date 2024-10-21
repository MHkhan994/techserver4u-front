import { Form, Input } from 'antd'
import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa';
import { TbMail } from "react-icons/tb";
import { MdLockOpen } from "react-icons/md";

const SignupFrom = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='auth-form-wrapper'>
            <Form
                className='auth-form'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                name='register-form'
            >

                <h2 className='text-center '>Registration</h2>
                <p className='text-center mb-10'>To stay connected with us, please registration.</p>
                <Form.Item
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}
                >
                    <Input prefix={<FaRegUserCircle size={20} />} type='text' className='default_input' placeholder='Enter name'></Input>
                </Form.Item>
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
            </Form>

        </div>
    )
}

export default SignupFrom
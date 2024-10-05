import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Search from './Search'
import Link from 'next/link'
import { HiMiniBars3CenterLeft, HiOutlineShoppingCart, HiOutlineUserCircle } from "react-icons/hi2";
import CategoryList from './CategoryList';
import { FaChevronDown } from "react-icons/fa";
import { Dropdown } from 'antd';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import CategoryListMobile from './CategoryListMobile';
import CartDrawer from './CartDrawer';


const Header = () => {

    const [categories, setCategories] = useState([])
    const isTablet = useMediaQuery({ query: '(max-width: 1200px)' })
    const isMobile = useMediaQuery({ query: `(max-width:640px )` })
    const [menuOpen, setMenuOpen] = useState(false)



    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/getcategory`)
            .then(res => {
                if (res.data) {
                    setCategories(res.data.categories)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const items = [
        {
            label: <Link href="/campaigns">Campaigns</Link>,
            key: '1',
        },
        {
            label: <Link href="/brands">Brands</Link>,
            key: '2',
        },
        {
            label: <Link href="/categories">Categories</Link>,
            key: '3',
        },
        {
            label: <Link href="#">Help</Link>,
            key: '4',
        },
        {
            label: <Link href="/categories">FAQ</Link>,
            key: '5',
        },
    ];

    return (
        <nav className='main_header'>
            <div className='main_container'>
                <div className='navbar-top'>
                    <Link className='navbar_logo' href={'/'}>
                        <Image src={'/logo_white.png'} height={100} width={200} alt='techserver4u logo' />
                    </Link>
                    {
                        !isMobile && <Search />
                    }
                    <CartDrawer />
                    <button className='nav_button'>
                        <HiOutlineUserCircle size={25} />
                    </button>
                </div>
                <div className='navbar-bottom'>
                    <div className='categories'>
                        {
                            !isTablet ? <Dropdown
                                trigger={['click']}
                                dropdownRender={() => <CategoryList categories={categories} />}
                            >
                                <button className='primary_btn category_btn'>
                                    <span>Categories</span>
                                    <FaChevronDown />
                                </button>
                            </Dropdown>
                                :

                                <div className='mobile_category_wrapper'>
                                    <button className='primary_btn category_btn' onClick={() => setMenuOpen(!menuOpen)}>
                                        <span>Categories</span>
                                        <FaChevronDown />
                                    </button>
                                    {
                                        menuOpen && isTablet && <CategoryListMobile categories={categories} />
                                    }
                                </div>
                        }
                    </div>

                    {
                        isMobile && <Search />
                    }

                    <div className="pages_list">
                        <li>
                            <Link href="/campaigns">Campaigns</Link>
                        </li>
                        <li>
                            <Link href="/brands">Brands</Link>
                        </li>
                        <li>
                            <Link href="/categories">Categories</Link>
                        </li>
                        <li>
                            <a href="#">Help</a>
                        </li>
                        <li>
                            <a href="#">FAQ</a>
                        </li>
                    </div>

                    <Dropdown
                        trigger={['click']}
                        className="nav_menu_dropdown_button"
                        overlayClassName={'nav_menu_dropdown'}
                        menu={{ items }}
                    >
                        <span onClick={(e) => e.preventDefault()}>
                            <HiMiniBars3CenterLeft size={24} color="white" />
                        </span>
                    </Dropdown>

                </div>
            </div>
        </nav>
    )
}

export default Header
import { Menu } from 'antd'
import Link from 'next/link'
import React from 'react'

const CategoryListMobile = ({ categories }) => {


    const items = categories?.map(category => (
        {
            key: `${category._id}`,
            label: <Link href={'/'}>{category?.name}</Link>,
            children: category?.children?.length !== 0 ? category?.children?.map(subCat => (
                {
                    key: subCat._id,
                    label: <Link href={'/'}>{subCat?.name}</Link>,
                    // type: 'group',
                    children: subCat?.children?.length !== 0 ? subCat?.children?.map(subCat2 => (
                        {
                            key: subCat2._id,
                            label: <Link href={'/'}>{subCat2?.name}</Link>
                        }
                    )) : null
                }
            )) : null
        }
    ))


    return (
        <menu className='mobile_category_list'>
            <Menu
                mode="inline"
                items={items}
            />
        </menu>
    )
}

export default CategoryListMobile
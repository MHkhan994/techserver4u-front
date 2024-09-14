import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Search = () => {
    return (
        <div className="search_wrapper">
            <div className="input_wrapper">
                <Image height={20} width={20} src={'/svgs/search_icon.svg'} alt="search-icon" />
                <input
                    placeholder="search for..."
                >
                </input>
            </div>
        </div>
    )
}

export default Search
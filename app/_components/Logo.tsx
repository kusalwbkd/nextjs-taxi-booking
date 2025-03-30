import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link className='cursor-pointe' href={'/'}>
            <h2 className='text-black text-3xl font-bold mt-4 '>
                <span className='bg-[#D17842] p-2 rounded-lg'>Taxi</span>
                <span className='text-3xl text-[#e7925e] bg-white'> {" "}App</span>
            </h2>
        </Link>
    )
}

export default Logo
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import Logo from './Logo'

const Header = () => {
  return (
    <div className='flex items-center justify-between p-4 px-10 shadow-sm'>
      
          <Logo/>
            <div className='md:flex items-center gap-6 hidden ' >
               
                    <h2 className='hover:bg-gray-100 hover:text-[#d17842] p-3 rounded-md cursor-pointer transition-all text-xl font-medium'>Home</h2>
                    <h2 className='hover:bg-gray-100  hover:text-[#d17842] p-3 rounded-md cursor-pointer transition-all text-xl font-medium'>History</h2>
                    <h2 className='hover:bg-gray-100 hover:text-[#d17842] p-3 rounded-md cursor-pointer transition-all text-xl font-medium'>Help</h2>
               
            </div>
          
            <UserButton/>


           
          
        </div>
      
   
  )
}

export default Header

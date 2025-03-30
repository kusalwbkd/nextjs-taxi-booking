"use client"
import React, { useState } from 'react'
import { payments } from '../Payments'
import Image from 'next/image'

const Cards = () => {
    const[activeIndex,setActiveIndex]=useState<number>()
  return (
    <div>
        <h2 className='text-[14px] font-medium'>Payment methods</h2>
        <div className='grid grid-cols-3 mt-2 ml-2'>
            {payments.map((item,index:number)=>(
                <div key={index} 
                className={`w-[50px] border-[1px] flex items-center justify-center rounded-md hover:scale-110 transition-all cursor-pointer ${activeIndex===index?'border-[#d17842] border-[2px]':''}`}
                onClick={()=>setActiveIndex(index)}
                >
                    <Image src={item.imagename} alt={item.name} width={30} height={50}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cards
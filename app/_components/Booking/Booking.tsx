"use client"
import React from 'react'
import AutoCompleteAddress from './AutoCompleteAddress'
import Cars from './Cars'
import Cards from './Cards'
import { useRouter } from 'next/navigation'
import { useUserLocation } from '@/context/UserLocationContext'

const Booking = () => {
  const router=useRouter()
  const{
    routesDirections,
    carAmount,
    setCarAmount
  }=useUserLocation()

  
  return (
    <div className='p-5'>
        <h2 className='text-xl font-semibold'>Booking</h2>
        <div className='border-1 border-gray-300 p-5 mt-5 rounded-md'>
        <AutoCompleteAddress/>
        <Cars/>
        <Cards/>
        <button 
        className='w-full bg-[#d17842] rounded-md p-1 mt-4 cursor-pointer font-bold text-white disabled:bg-[#b8afa9] disabled:cursor-default'
        onClick={()=>router.push('/payment')}
        disabled={routesDirections?.length<1}
        
        >
          Pay Now
        </button>

        </div>
    </div>
  )
}

export default Booking
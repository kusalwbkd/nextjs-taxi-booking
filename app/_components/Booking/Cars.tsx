
"use client"
import React, { useEffect, useState } from 'react'
import { cars } from '../CarList'
import Image from 'next/image'
import { useUserLocation } from '@/context/UserLocationContext'

const Cars = () => {
    const[selectedCar,setSelectedCar]=useState<number>(0)
    const [carCoasts, setCarCoasts] = useState<string[]>([]);
     const { 
        routesDirections,
        setRoutesDirections,
        routesData,
        carAmount,
        setCarAmount
      } = useUserLocation()

      console.log("routesDirections",routesData);
      const getCoast=(charges:number)=>{
        if (routesData?.routes[0]?.distance) {
          return (charges * routesData.routes[0].distance * 0.001).toFixed(2);
      }
      return '0';
     }

      useEffect(()=>{
        if (routesData?.routes[0]?.distance) {
          // Update the coast for all cars
          const updatedCoasts = cars.map(car => getCoast(car.charges));
          setCarCoasts(updatedCoasts);
      }
      },[routesDirections])
      
     
  return (
    <div className='mt-3'>
        <h2 className='font-semibold'>Select a car</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
        {cars.map((car,index)=>(
          <div 
          key={index} 
          className={` p-5 m-2 border-[1px] rounded-md hover:border-[#d17842] cursor-pointer ${index===selectedCar? 'border-[#d17842]  border-[2px]':''}`}
           onClick={()=>{setSelectedCar(index),setCarAmount(carCoasts[index])}}>
           
            <Image src={car.imagename} alt={car.name} width={75} height={90} className='w-full object-cover'/>

            <div className='flex items-center  mt-2'>
            <h2 className='font-semibold text-sm text-gray-600 '>{car.name}</h2>
          
            </div>
            <span className='text-sm'> ${carCoasts[index] || car.charges} / hr</span>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Cars
"use client"
import { useUserLocation } from '@/context/UserLocationContext'
import React, { useEffect, useState } from 'react'

const DistanceTime = () => {

    const { userLocation,
        locationCoordinates,
        destinationCoordinates,
        setUserLocation,
        setLocationCoordinates,
        setDestinationCoordinates,
        routesDirections,
        setRoutesDirections,
        routesData,
        setRoutesData
    } = useUserLocation()

    const[distance,setDistance]=useState<string>()
    const[duration,setDuration]=useState<string>()

    useEffect(()=>{
        const newDistance=(routesData?.routes[0]?.distance * 0.001).toFixed(2)
        setDistance(newDistance)

        const newDuration=(routesData?.routes[0]?.duration /60).toFixed(2)
        setDuration(newDuration)

    },[routesData])


    return routesData?.routes[0] && (
        <div className='bg-yellow-500 p-3'>
            <h2 className='text-yellow-100 opacity-80 text-[15px]'>

                Distance: <span className='mr-3 font-bold text-black'>

                    {duration} Kms
                </span>
                 
                 Duration : <span className='font-bold text-black'>{distance} mins</span>
            </h2>
        </div>
    )
}

export default DistanceTime
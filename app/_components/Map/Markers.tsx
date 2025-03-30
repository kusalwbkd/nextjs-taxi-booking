import { useUserLocation } from '@/context/UserLocationContext'
import React from 'react'
import Map, { Marker } from 'react-map-gl/mapbox'

const Markers = () => {

    const { userLocation,
        locationCoordinates,
        destinationCoordinates,
        setUserLocation,
        setLocationCoordinates,
        setDestinationCoordinates } = useUserLocation()

        
    return (
        <div>
            {userLocation.latitude && !locationCoordinates.latitude  && userLocation.longitude && !locationCoordinates.longitude &&
                <Marker longitude={userLocation.longitude} latitude={userLocation.latitude} anchor="bottom" >
                    <img src="/pin.png" className='w-10 h-10' />
                </Marker>
            }

            {locationCoordinates.latitude && locationCoordinates.longitude &&
                <Marker longitude={locationCoordinates.longitude} latitude={locationCoordinates.latitude} anchor="bottom" >
                    <img src="/pin.png" className='w-10 h-10' />
                </Marker>
            }

            {destinationCoordinates.latitude && destinationCoordinates.longitude &&
                <Marker longitude={destinationCoordinates.longitude} latitude={destinationCoordinates.latitude} anchor="bottom" >
                    <img src="/pin.png" className='w-10 h-10' />
                </Marker>
            }


        </div>
    )
}

export default Markers
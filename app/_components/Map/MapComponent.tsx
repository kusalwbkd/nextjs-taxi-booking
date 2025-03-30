"use client"
import { useUserLocation } from '@/context/UserLocationContext'
import React, { useEffect, useRef } from 'react'
import Map, { Marker } from 'react-map-gl/mapbox'
import 'mapbox-gl/dist/mapbox-gl.css';
import Loading from '../Loading';
import Markers from './Markers';
import MapBoxRoutes from './MapBoxRoutes';
import DistanceTime from './DistanceTime';

const MapComponent = () => {
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

 


  const mapRef = useRef<any>(null)
  useEffect(() => {
    if (locationCoordinates && mapRef.current) {
      mapRef.current?.flyTo({
        center: [
          locationCoordinates.longitude,
          locationCoordinates.latitude,

        ],
        duration: 2500
      })
    }

  }, [locationCoordinates])


  useEffect(() => {
    if (destinationCoordinates && mapRef.current) {
      mapRef.current?.flyTo({
        center: [
          destinationCoordinates.longitude,
          destinationCoordinates.latitude,

        ],
        duration: 2500
      })
    }

    if (
      locationCoordinates?.longitude != null &&
      locationCoordinates?.latitude != null &&
      destinationCoordinates?.longitude != null &&
      destinationCoordinates?.latitude != null
    ) {
      getDirectionRoute()
    }

  }, [destinationCoordinates])

  const getDirectionRoute = async () => {
  

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MAPBOX_DRIVING_URL}${locationCoordinates.longitude},${locationCoordinates.latitude};${destinationCoordinates.longitude},${destinationCoordinates.latitude}?geometries=geojson&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}`
      
       
        , {
          headers: {
            "Content-type": "application/json"
          }
        }
      )
      const data = await response.json();
      console.log("reesposne",data);
      setRoutesData(data)
      setRoutesDirections(data?.routes[0]?.geometry?.coordinates)
    } catch (error) {
      console.log(error);

    }
  }

  if (userLocation.longitude === null || userLocation.latitude === null) {
    return (
      <Loading />
    )

  }

  if (userLocation.longitude && userLocation.latitude) {
    return (
      <div className='p-5'>
        <h2 className='text-[20px] font-semibold'>Map</h2>
        <div className='rounded-lg overflow-hidden'>
          <Map
            ref={mapRef}
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation.longitude,
              latitude: userLocation.latitude,
              zoom: 14
            }}
            style={{ width: '100%', height: 500, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
            <Markers />
            {routesDirections.length >1 && 
             <MapBoxRoutes
             coordinates={routesDirections}
             />
            }

          </Map>
          <div className='absolute bottom-[40px] z-20 right-[20px] hidden md:block'>
            <DistanceTime/>
          </div>
        </div>
      </div>
    )
  }




}

export default MapComponent
"use client";
import { Coordinates, UserLocationContextType } from "@/app/types";
import { createContext, useContext, useEffect, useState } from "react";


const UserLocationContext = createContext<UserLocationContextType | null>(null);

export const UserLocationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userLocation, setUserLocation] = useState<Coordinates>({
    latitude:-37.817979,
    longitude:144.969091,
  });

  const [locationCoordinates, setLocationCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });

  const [destinationCoordinates, setDestinationCoordinates] = useState<Coordinates>({
    latitude: null,
    longitude: null,
  });

 // const [routesDirections, setRoutesDirections] = useState<Coordinates[]>([]);
  const [routesDirections, setRoutesDirections] = useState<[number, number][]>([]);
  const[routesData,setRoutesData]=useState<any>()
  const[carAmount,setCarAmount]=useState<string>('')

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("position", position);
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
      }
    );
  };

/*   useEffect(() => {
    getUserLocation();
  }, []); */
 
  return (
    <UserLocationContext.Provider value={{
      userLocation,
      locationCoordinates,
      destinationCoordinates,
      setUserLocation,
      setLocationCoordinates,
      setDestinationCoordinates,
      routesDirections, 
      setRoutesDirections,
      routesData,
      setRoutesData,
      carAmount,
      setCarAmount


    }}>
      {children}
    </UserLocationContext.Provider>
  );
};

// Correct way to use the context
export const useUserLocation = () => {
  const context = useContext(UserLocationContext);
  if (!context) {
    throw new Error("useUserLocation must be used within a UserLocationProvider");
  }
  return context;
};

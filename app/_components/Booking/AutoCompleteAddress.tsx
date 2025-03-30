"use client";
import { Coordinates, Suggestion, SuggestionsData } from "@/app/types";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';  // Import UUID function
import Loading from "../Loading";
import { useUserLocation } from "@/context/UserLocationContext";


  
const AutoCompleteAddress = () => {
    const [locationQuery, setLocationQuery] = useState<string>('');
    const [destinationQuery, setDestinationQuery] = useState<string>('');
    const [locationResults, setLocationResults] = useState<SuggestionsData[]>([]);
    const [destinationResults, setDestinationResults] = useState<SuggestionsData[]>([]);
    const [error, setError] = useState<string>('');
    const[loading,setLoading]=useState<boolean>(false)
    const [locationSelected, setLocationSelected] = useState<boolean>(false);
    const [destinationSelected, setDestinationSelected] = useState<boolean>(false);
     const{setDestinationCoordinates,setLocationCoordinates} =  useUserLocation()
    const sessionToken = uuidv4();

   


    useEffect(() => {
        if (locationQuery.trim() === '' || locationSelected) {
            setLocationResults([]); 
            return;
        }
        const timer = setTimeout(() => {
            getAddress(locationQuery, setLocationResults);
        }, 500);

        return () => clearTimeout(timer);
    }, [locationQuery]);

    useEffect(() => {
        if (destinationQuery.trim() === '' || destinationSelected) {
            setDestinationResults([]); 
            return;
        }
        const timer = setTimeout(() => {
            getAddress(destinationQuery, setDestinationResults);
        }, 500);

        return () => clearTimeout(timer);
    }, [destinationQuery]);

    const getAddress = async (query: string,
        setResults: React.Dispatch<React.SetStateAction<SuggestionsData[]>>
    ) => {
        try {
            setLoading(true)

            const response=await fetch(`${process.env.NEXT_PUBLIC_MAPBOX_URL}suggest?q=${encodeURIComponent(query)}&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}&session_token=${sessionToken}&country=AU`)
            const data = await response.json();
            

            if (response.ok) {
                setResults(data?.suggestions || []);
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Network error');
            console.error('Error fetching data:', err);
        }finally{
            setLoading(false)
        }
    };
 
    const getCoordinates=async(item:Suggestion,
        setCordinates:any
    )=>{
          try {
            setLoading(true)
            const response=await fetch(`${process.env.NEXT_PUBLIC_MAPBOX_URL}retrieve/${item.mapbox_id}?session_token=${sessionToken}&access_token=${process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN}`)
            const data = await response.json();
            setCordinates({
                latitude: data?.features[0]?.properties?.coordinates?.latitude,  // Latitude
                longitude: data?.features[0]?.properties?.coordinates?.longitude, // Longitude
            });
         
            

          } catch (error) {
            setError('Network error');
            console.error('Error fetching data:', error);
          }finally{
            setLoading(false)
          }
    }
    


    

    return (
        <div className='mt-5'>
            {/* Location Input */}
            <div>
                <label className='text-gray-600'>Choose your Location?</label>
                <input
                    type='text'
                    onChange={(e) => {
                        setLocationQuery(e.target.value);
                        setLocationSelected(false); // Reset selection state on user input
                    }}
                    value={locationQuery}
                    className='bg-white p-1 focus:border-[#d17842] border-[2px] border-gray-300 w-full rounded-md outline-none'
                />
                {locationResults?.length > 0 && (
                    <div className="bg-white border border-gray-300 mt-1 rounded-md shadow-md absolute z-10 w-full">
                        {locationResults?.map((result:any, index: number) => (
                            <div
                                key={index}
                                className="flex gap-2 items-center rounded-md p-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setLocationQuery(`${result?.name}, ${result?.full_address !==undefined ?result?.full_address:''}`);
                                    setLocationResults([]); 
                                    setLocationSelected(true); // Mark selection as complete
                                    getCoordinates(result,setLocationCoordinates)
                                }}
                            >
                                <h2 className="p-3">{`${result?.name} , ${result?.full_address !==undefined ?result?.full_address:''}`}</h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Destination Input */}
            <div className='mt-3'>
                <label className='text-gray-600'>Choose your Destination?</label>
                <input
                    type='text'
                    onChange={(e) => {
                        setDestinationQuery(e.target.value);
                        setDestinationSelected(false); // Reset selection state on user input
                    }}
                    value={destinationQuery}
                    className='bg-white p-1 focus:border-[#d17842] border-[2px] border-gray-300 w-full rounded-md outline-none'
                />
                {destinationResults?.length > 0 && (
                    <div className="bg-white border border-gray-300 mt-1 rounded-md shadow-md absolute z-10 w-full">
                        {destinationResults?.map((result: any, index: number) => (
                            <div
                                key={index}
                                className="flex gap-2 items-center rounded-md p-1 hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    setDestinationQuery(`${result?.name}, ${result?.full_address !==undefined ?result?.full_address:''}`);
                                    setDestinationResults([]);
                                    setDestinationSelected(true); // Mark selection as complete
                                    getCoordinates(result,setDestinationCoordinates)
                                  
                                }}
                            >
                                <h2 className="p-3">{`${result?.name} , ${result?.full_address !==undefined ?result?.full_address:''}`}</h2>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && <div className='text-red-500 mt-3'>{error}</div>}
        </div>
    );
};

export default AutoCompleteAddress;

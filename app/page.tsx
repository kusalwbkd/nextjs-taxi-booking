import { UserButton, UserProfile } from "@clerk/nextjs";
import { Outfit } from "next/font/google";
import Image from "next/image";
import Booking from "./_components/Booking/Booking";
import MapComponent from "./_components/Map/MapComponent";
import { UserLocationProvider } from "@/context/UserLocationContext";

export default function Home() {
  return (
   
    <div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        <div>
          <Booking/>
        </div>

        <div className="col-span-2">
           <MapComponent/>
        </div>

      </div>

    </div>
  
  );
}

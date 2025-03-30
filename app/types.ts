export type Coordinates = {
    latitude: number | null;
    longitude: number | null;
  };
  

  type Context = {
    country: {
      name: string;
      country_code: string;
      country_code_alpha_3: string;
    };
    region: {
      name: string;
      region_code: string;
      region_code_full: string;
    };
    postcode: { name: string };
    place: { name: string };
    neighborhood?: { name: string };
    street?: { name: string };
  };
  
  export type Suggestion = {
    name: string;
    mapbox_id: string;
    feature_type: string;
    address: string;
    full_address: string;
    place_formatted: string;
    context: Context;
    language: string;
    maki: string;
    poi_category: string[];
    poi_category_ids: string[];
    external_ids: {
      safegraph: string;
      foursquare: string;
    };
    metadata: Record<string, unknown>; // Flexible type for additional data
  };
  
 export type SuggestionsData = {
    suggestions: Suggestion[];
    attribution: string;
  };

  export type UserLocationContextType = {
    userLocation: Coordinates;
    locationCoordinates: Coordinates;
    destinationCoordinates: Coordinates;
    routesData:any
    carAmount:string
    setUserLocation: (location: Coordinates) => void;
    setLocationCoordinates: (location: Coordinates) => void;
    setDestinationCoordinates: (location: Coordinates) => void;
    routesDirections:[number,number][]
    setRoutesDirections:(location:[number,number][])=>void
    setRoutesData:(location:any)=>void
    setCarAmount:(amount:string)=>void
  };


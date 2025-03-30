
import React from 'react'
import { Layer, Source } from 'react-map-gl/mapbox'
import { GeoJSON } from "geojson";

interface MapBoxRoutesProps {
    coordinates: [number, number][]; 
  }



const MapBoxRoutes: React.FC<MapBoxRoutesProps> = (props) => {
    const geoJsonData: GeoJSON.Feature = {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: props.coordinates,
        },
        properties: {}, 
      };
   
    
  return (
    <Source  type="geojson" data={geoJsonData}>
    <Layer 
    type='line'
    layout={{'line-join':'round','line-cap':'square'}}
    paint={{'line-color':'#0462d4','line-width':4}}
    />
  </Source>
  )
}

export default MapBoxRoutes


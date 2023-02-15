import React from 'react'
import { useEffect,useState,useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'
import tt from '@tomtom-international/web-sdk-maps';
function Map() {
    const mapElement = useRef();
    const [mapZoom, setMapZoom] = useState(13);
  
    useEffect(() => {
      let data=JSON.parse(localStorage.getItem('location'))
      let map = tt.map({
        key: 'mURy0iEpFAt3hNZGAdAQrTrGcJTzoqdD',
        container: mapElement.current,
        center: [data.longitude,data.latitude],
        zoom: 17,
      });
      new tt.Marker().setLngLat([data.longitude,data.latitude]).addTo(map)
      return () => map.remove();
    });
  
    return (
      
    <div ref={mapElement} className="mapDiv" />
    );
  
}

export default Map

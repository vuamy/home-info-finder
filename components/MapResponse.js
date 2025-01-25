import { useState, useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader"


export default function MapResponse({ location, address }) {
    // State to store the map instance
    const [mapDisplay, setMapDisplay] = useState(null);

    const mapRef = useRef(null);
    console.log(location)

    // Create a new map instance
    useEffect(() => {
        if (!mapRef.current) return;

        const map = new google.maps.Map(mapRef.current, {
            center: { lat: location[0], lng: location[1] },
            zoom: 15,
        });

        const geocoder = new google.maps.Geocoder();

        const marker = new google.maps.Marker({
            position: { lat: location[0], lng: location[1] },
            map: map,
            title: address,
        });

        setMapDisplay(map);

    }, [location]);

    return (
        <div className="w-full h-full">
            <div
                id="map"
                ref={mapRef} // Attach the ref to this div
                className="w-full h-full"
            />
            {!mapDisplay && <p>Loading...</p>}
        </div>
    )
}
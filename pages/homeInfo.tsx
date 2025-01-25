import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Footer from "../components/Footer.js";
import GptResponse from "../components/GptResponse.js";
import MapResponse from "../components/MapResponse.js";

export default function HomeInfo() {
    // Save home information in variables
    const [fullName, setFullName] = useState("")
    const [location, setLocation] = useState([])
    const [imageUrl, setImageUrl] = useState(null)

    // Query place ID
    const router = useRouter();
    const { address } = router.query

    // Function that finds Google Place details with place ID
    const fetchPlaceDetails = async (address) => {
        try {
            const response = await fetch(`https://places.googleapis.com/v1/places/${address}?fields=formattedAddress,location&key=${process.env.GOOGLE_API_KEY}`);
            const data = await response.json();
            setFullName(data.formattedAddress)
            if (data.location) {
                setLocation([data.location.latitude, data.location.longitude])
                fetchPlaceImage(data.location.latitude, data.location.longitude);
            }

            if (data.results && data.results.length > 0) {
            } else {
                console.log("No results found.");
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
        }
    }

    // Function to get image based on Google Map URI
    const fetchPlaceImage = async ( latitude, longitude ) => {
        try {
            const response = await fetch(
            `https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${latitude},${longitude}&key=${process.env.GOOGLE_API_KEY}`
            );
            const imageBlob = await response.blob();
            setImageUrl(URL.createObjectURL(imageBlob));
            
            if (imageBlob) {
            } else {
                console.log("No results found.");
            }
        } catch (error) {
            console.error("Error fetching photos:", error);
        }
    }

    // Get place details only if address changes
    useEffect(() => {
        if (address) {
            fetchPlaceDetails(address);
        }
    }, [address]);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="main-content flex flex-col flex-grow bg-muted flex p-10 items-center">
                <div className="">
                    <p>You entered the address:</p>
                    <h2 className="text-3xl font-semibold">{fullName}</h2>
                </div>
                <div className="mt-10 flex justify-center items-center">
                    <img 
                        src={imageUrl} 
                        alt="Place Photo" 
                        className="border border-primary rounded-lg"
                    />
                    <div className="w-full ml-10">
                        <GptResponse address={fullName}/>
                    </div>
                </div>
                <div className="mt-10 flex h-96 w-3/4">
                    <MapResponse location={location} address={fullName}/>
                </div>
            </main>
            <Footer/>
        </div>
    )
}
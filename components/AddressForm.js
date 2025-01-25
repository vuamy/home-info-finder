import { useState } from "react";
import { useRouter } from "next/router"

export default function AddressForm() {
    // Stores all address variables and validation flag
    const [streetOne, setStreetOne] = useState("");
    const [streetTwo, setStreetTwo] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [error, setError] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Move to new page if correct
    const router = useRouter();

    // Function for formatting address from target values
    const formatAddress = () => {
        const baseAddress = {
            address: {
            regionCode: "US",
            addressLines: [
                streetOne, 
                streetTwo, 
                city, 
                state, 
                zip
            ].filter(line => line && line.trim() !== "")
            }
        };

        return JSON.stringify(baseAddress) // Ensure proper format
    };

    // Function for submitting form
    const handleSubmit = async (event) => {
        const addressQuery = formatAddress();
        event.preventDefault();
        
        try {
            const response = await fetch(
                `https://addressvalidation.googleapis.com/v1:validateAddress?key=${process.env.GOOGLE_API_KEY}`,
                {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: addressQuery,
                }
            );

            setHasSubmitted(true);
            const data = await response.json();

            if (data.result?.verdict?.addressComplete) {
                setIsValid(true);
                setError("");
                router.push({
                    pathname: '/homeInfo',
                    query: { address: data.result.geocode.placeId },
                });
            } else {
                setIsValid(false);
                setError("Invalid address.");
            }
            } catch (error) {
                setIsValid(false);
                setError("Failed to validate address. Please try again.");
                console.error(error);
        }
    };

    return(
        <div className="w-full flex justify-center items-center">
            <form className="flex flex-col justify-center align-center w-3/4"
                onClick={handleSubmit}>
                <p className="text-md font-semibold">
                    Enter the property address below:
                </p>
                    <p className="text-xs mt-4">Street Address</p>
                    <input 
                        type="text" 
                        className="mt-2 px-4 py-1 border border-neutral-700 border-solid text-sm rounded-md"
                        placeholder="Street Address"
                        value={streetOne}
                        onChange={(e) => setStreetOne(e.target.value)}
                    />
                    <input 
                        type="text" 
                        className="mt-2 px-4 py-1 border border-neutral-700 border-solid text-sm rounded-md"
                        placeholder="Apt., suite, or unit"
                        value={streetTwo}
                        onChange={(e) => setStreetTwo(e.target.value)}
                    />
                    <p className="text-xs mt-4">City</p>
                    <input 
                        type="text" 
                        className="mt-2 px-4 py-1 border border-neutral-700 border-solid text-sm rounded-md"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <div className="flex gap-4 mt-4">
                        <div>
                            <p className="text-xs">State</p>
                            <input 
                                type="text" 
                                className="mt-2 px-4 py-1 border border-neutral-700 border-solid text-sm rounded-md"
                                placeholder="State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            />
                        </div>
                        <div>
                            <p className="text-xs">Zip</p>
                            <input 
                                type="text" 
                                className="mt-2 px-4 py-1 border border-neutral-700 border-solid text-sm rounded-md"
                                placeholder="Zip"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                            />
                        </div>
                    </div>
                    {isValid === false && error && hasSubmitted === true && (
                        <p className="text-sm text-error font-semibold mt-4">{error}</p>
                        )}
                    <button className="mt-6 self-end border bg-primary text-white border-solid px-2 py-2 text-sm font-semibold rounded-md w-1/3">
                        Submit
                    </button>
            </form>
          </div>
    );
}
import OpenAI from "openai";
import { useState, useEffect } from "react";

export default function GptResponse({ address }) {
    // Create variable to store OpenAI response
    const [response, setResponse] = useState(null);

    // Fetch response from OpenAI API
    useEffect(() => {
        if (!address) return;

        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                // Initialize the OpenAI API client
                const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true });

                // Define the prompt
                const prompt = [
                    { 
                        role: "system", 
                        content: `
                            You are an expert in home property information. Your task is to provide clear, detailed, and well-organized information about a property based on the given address. 
                            Follow these instructions carefully:
                            
                            1. **Property Overview**: Include the estimated value, size (number of bedrooms, bathrooms, and square footage). Ensure this section is as detailed as possible.
                            2. **Nearby Schools**: List **all schools** within a 1.5-mile radius of the property. Include their ratings and distance from the property. Include K-12 schools, without omission. If any information is missing, label it as 'Unknown' (for example, if ratings or distances are not available). List schools in a clear and concise manner.
                            3. **Neighborhood Highlights**: Mention notable landmarks, parks, shopping centers, public transport, and any other important amenities. Include as much detail as possible.
                            
                            Ensure that the response is structured as follows:
                            
                            - Use **double asterisks** only for the main headings.
                            - Keep each item under the main heading as a single line (don't split one item into multiple lines).
                            - Label any unknown information as 'Unknown' (e.g., if the estimated value is not available, show 'Unknown').
                            
                            The response should be comprehensive and formatted clearly with each section separated distinctly. Avoid any introductory phrases or explanations. Provide the information in the exact format requested. Make sure no important detail is omitted.
                        `
                    }, 
                    {
                        role: "user",
                        content: `Give me information on the property at ${address}.`,
                    }
                ];

                // Define the completion options
                const completion = await openai.chat.completions.create({
                    model: "gpt-4o-mini",
                    messages: prompt,
                    store: true,
                });

                // Save response to state
                setResponse(formatResponse(completion.choices[0].message.content));

            } catch (error) {
                console.error("Error fetching GPT response:", error);
                setResponse("Error fetching GPT response. Please try again later.");
            }
        };

        if (address) {
            fetchData();
        }
    }, [address]);

    // Function to store response as a structured array
    const formatResponse = (completeResponse) => {
        // Split the response into sections based on "**"
        const sections = completeResponse.split("**").filter((section) => section.trim() !== "");
    
        // Initialize the structured data array
        const structuredData = [];
    
        // Process each section
        for (let i = 0; i < sections.length; i += 2) {
            const title = sections[i].trim();
            const content = sections[i + 1] ? sections[i + 1].split("\n").map((line) => line.trim()) : []; // Content follows the title
    
            structuredData.push({
                title: title.replace(":", "").trim(),
                content: content.filter((line) => line !== "" && line.replace(":", "").trim()),
            });
        }
    
        return structuredData;
    };

    return (
        <div>
            <table className="table-auto rounded-lg w-full">
                <tbody>
                    {Array.isArray(response) && response.length > 0 ? (
                        response.map((section, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2 bg-primary text-white rounded-l-md">
                                    <h2>{section.title}</h2>
                                </td>
                                <td className="border px-4 py-2 bg-secondary rounded-r-md">
                                    <ul>
                                        {section.content.map((line, index) => (
                                            <li key={index}>{line}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border px-4 py-2">Loading...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
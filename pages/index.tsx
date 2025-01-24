/**
 * File: index.tsx
 * Author: Amy Vu
 * Date: 01.23.2025
 * Description: Input home address and obtain property and neighborhood information using AI created for eGain Assessment
 */

import Footer from "../components/Footer.js";
import AddressForm from "../components/AddressForm.js"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="main-content flex-grow bg-muted flex items-center justify-center">
        <div className="grid grid-cols-2 grid-flow-col w-full h-full">
          <div className="px-10 bg-secondary flex flex-col justify-center">
            <h2 className="text-xl font-semibold">
              Welcome to the
            </h2>
            <h1 className="text-4xl font-bold text-primary">
              Home Information Finder!
            </h1>

            <p className="mt-10 text-md">
              Find information about a housing property such as its value, location, and neighborhood simply by entering an address.
            </p>
          </div>
          <AddressForm/>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

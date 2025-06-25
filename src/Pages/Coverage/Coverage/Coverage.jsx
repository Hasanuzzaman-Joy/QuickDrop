import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import CoverageMap from "../Map/CoverageMap";
import { useLoaderData } from "react-router";

const Coverage = () => {

    const[searchTerm, setSearchTerm] = useState('');
    const[flyCoords, setFlyCoords] = useState(null);

    const coverageData = useLoaderData();

    const handleSearch = () =>{
        const result = coverageData.find(center => center.district.toLowerCase().includes(searchTerm));

        if(result){
            setFlyCoords([result.latitude, result.longitude])
        }
        else {
            alert("No matching district found.");
        }
    }

    return (
        <div className="w-full px-4 md:px-8 py-5">
            <div className="bg-white py-7 rounded-3xl px-5">
                {/* Title */}
                <h1 className="text-4xl font-extrabold text-secondary text-center mb-8">
                    We are available in 64 districts
                </h1>

                {/* Search Bar */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search your district..."
                            className="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={handleSearch} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary cursor-pointer text-black hover:text-white p-2 rounded-full hover:bg-secondary transition-all duration-300">
                            <FaSearch />
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t-2 border-dashed border-gray-300 mb-10"></div>

                {/* Subtitle */}
                <h2 className="text-3xl font-extrabold text-center text-secondary mb-6">
                    We deliver almost all over Bangladesh
                </h2>

                <div className="w-full md:w-[90%] mx-auto">
                    <CoverageMap flyCoords={flyCoords} coverageData={coverageData} />
                </div>
            </div>
        </div>
    );
};

export default Coverage;

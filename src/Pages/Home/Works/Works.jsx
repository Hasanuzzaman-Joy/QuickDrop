import React, { useEffect, useState } from 'react';

import { FaCarSide, FaMoneyBillWave, FaWarehouse, FaBuilding } from "react-icons/fa";

// Map icon name strings to React components
const iconMap = {
    FaCarSide: <FaCarSide className="text-4xl text-secondary mx-auto" />,
    FaMoneyBillWave: <FaMoneyBillWave className="text-4xl text-secondary mx-auto" />,
    FaWarehouse: <FaWarehouse className="text-4xl text-secondary mx-auto" />,
    FaBuilding: <FaBuilding className="text-4xl text-secondary mx-auto" />
};

const Works = () => {
    const [works, setWorks] = useState([]);

      useEffect(() => {
        fetch('/works.json')
          .then(res => res.json())
          .then(data => setWorks(data))
          .catch(err => console.error("Failed to load services:", err));
      }, []);

    return (
        <div className='w-full px-4 md:px-8 py-7 md:py-16'>
            <h1 className='text-4xl font-extrabold text-left text-secondary pb-7 leading-13'>How it Works</h1>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {works.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white flex flex-col items-start shadow-md p-6 hover:shadow-xl transition duration-300 rounded-3xl"
                    >
                        <div className="mb-2">{iconMap[item.icon]}</div>
                        <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-base">{item.paragraph}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Works;

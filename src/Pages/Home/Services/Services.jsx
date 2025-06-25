import React, { useEffect, useState } from 'react';
import service from "../../../assets/service.png";

const Services = () => {
  
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/services.json')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error("Failed to load services:", err));
  }, []);

  return (
    <section className="w-full px-4 md:px-8 py-16 bg-secondary">
      {/* Title Section */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h1 className="text-4xl text-white font-extrabold pb-7 leading-13">Our Services</h1>
        <p className="font-medium text-white text-base">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-white h-full flex flex-col justify-center items-center shadow-md p-8 rounded-3xl hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer"
          >
            <img src={service} alt="Service" className="w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold text-secondary group-hover:text-white mb-3 transition-colors duration-300 text-center">
              {item.title}
            </h3>
            <p className="text-gray-600 group-hover:text-white text-base font-medium leading-7 transition-colors duration-300 text-center">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;

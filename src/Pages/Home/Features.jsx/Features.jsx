import React from "react";
import transit from "../../../assets/features/Transit warehouse.png";
import safe from "../../../assets/features/safe.png";

const cardData = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        description:
            "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: transit,
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        description:
            "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: safe,
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        description:
            "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: transit,
    },
];

const Features = () => {
    return (
        <div className='w-full flex flex-col gap-7 px-4 md:px-8 py-7 md:py-16'>
            {cardData.map(({ id, title, description, image }) => (
                <div
                    key={id}
                    className="flex flex-col bg-white md:flex-row items-center md:items-start gap-6 h-full rounded-3xl p-8 md:p-4"
                >
                    {/* Left image container - 35% width */}
                    <div className="w-full md:w-[25%] flex justify-center">
                        <img
                            src={image}
                            alt={title}
                            className="object-contain h-48 w-full rounded md:p-7"
                        />
                    </div>

                    {/* Vertical dashed divider */}
                    <div className="hidden md:block border-l-2 border-dashed border-gray-300 h-28 self-center"></div>

                    {/* Right text content */}
                    <div className="w-full md:w-[70%] pt-10">
                        <h2 className="text-secondary text-2xl font-extrabold mb-3 text-center md:text-left">{title}</h2>
                        <p className="text-gray-700 text-base font-medium leading-7 text-center md:text-left">{description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Features;

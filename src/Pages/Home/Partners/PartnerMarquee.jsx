import React from 'react';
import amazon from '../../../assets/brands/amazon.png';
import casio from '../../../assets/brands/casio.png';
import moonstar from '../../../assets/brands/moonstar.png';
import amazon_vector from '../../../assets/brands/amazon_vector.png';
import randstad from '../../../assets/brands/randstad.png';
import startPeople from '../../../assets/brands/start-people.png';
import start from '../../../assets/brands/start.png';
import Marquee from 'react-fast-marquee';

const PartnerMarquee = () => {

    const logos = [
        amazon, casio, moonstar, amazon_vector, randstad, startPeople, start
    ]

    return (
        <>
            <div className='w-full px-4 md:px-8 py-7 md:py-16'>
                <h1 className='text-4xl font-extrabold text-center text-secondary pb-16 leading-13'>We've helped thousands of sales teams</h1>
                <Marquee speed={90}>
                    {
                        logos.map((logo, index) => <img
                            key={index}
                            src={logo}
                            alt={`Logo ${index}`}
                            className="h-6 mx-10 transition duration-300"
                        />)
                    }
                </Marquee>
            </div>
            {/* Dashed divider */}
            <hr className="border-t-2 border-dashed border-gray-300 mx-4 md:mx-8" />
        </>
    );
};

export default PartnerMarquee;
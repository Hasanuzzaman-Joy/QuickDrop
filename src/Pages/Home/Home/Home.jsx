import React from 'react';
import Slider from '../Slider/Slider';
import Works from '../Works/Works';
import Services from '../Services/Services';
import PartnerMarquee from '../Partners/PartnerMarquee';
import Features from '../Features.jsx/Features';

const Home = () => {
    return (
        <div>
            {/* <Slider /> */}
            <Works />
            <Services />
            <PartnerMarquee />
            <Features />
        </div>
    );
};

export default Home;
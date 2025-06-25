import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Pages/shared/Navbar';

const RootLayouts = () => {
    return (
        <>
            <div className='max-w-7xl mx-auto bg-[#EAECED]'>
                <Navbar />
                <Outlet />
            </div>
        </>
    );
};

export default RootLayouts;
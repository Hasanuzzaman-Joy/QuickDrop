import React from 'react';
import { Outlet } from 'react-router';
import authImage from '../assets/authImage.png';
import logo from '../assets/logo.png';

const AuthLayouts = () => {
    return (
        <>
            <div className='max-w-7xl mx-auto bg-[#ffffff] min-h-screen'>
                <div className='flex items-end mt-4 ml-4'>
                    <img src={logo} alt="navbar_logo" />
                    <h1 className='text-3xl font-extrabold -ml-4'>QuickDrop</h1>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5 px-4 md:px-8 py-12'>
                    <Outlet />
                    <div>
                        <img src={authImage} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthLayouts;
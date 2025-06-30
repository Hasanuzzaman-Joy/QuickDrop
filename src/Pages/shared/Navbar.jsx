import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/logo.png'
import { MdArrowOutward } from "react-icons/md";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {

    const { user, logOut } = useAuth();

    const navLinks =
        <div className="flex gap-7 font-medium text-lg">
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/services'>Services</NavLink>
            <NavLink to='/coverage'>Coverage</NavLink>
            {
                user ?
                    <>
                        <NavLink to='/add-parcel'>Add Parcel</NavLink>
                        <NavLink to='/dashboard'>Dashboard</NavLink>
                        <NavLink to='/be-a-rider'>Be A Rider</NavLink>
                    </> : " "
            }
        </div>

    const handleLogOut = () => {
        logOut()
    }

    return (
        <div className="navbar bg-base-100 shadow-sm px-5 py-3">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <div className='flex items-end'>
                    <img src={logo} alt="navbar_logo" />
                    <h1 className='text-3xl font-extrabold -ml-4'>QuickDrop</h1>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end flex gap-2">
                {
                    user ?
                        <button onClick={handleLogOut} className="btn btn-outline w-[151px] h-[40px] text-lg font-bold text-black border-base-300 rounded-3xl">Logout</button> :
                        <>
                            <Link to='/login' className="btn btn-outline w-[151px] h-[40px] text-lg font-bold text-black border-base-300 rounded-3xl">Sign in</Link>
                            <Link to='/register' className="btn btn-primary w-[126px] h-[40px] text-lg font-bold text-black border-base-300 rounded-3xl">Be a rider</Link>
                            <div className="flex justify-center items-center bg-black w-[40px] h-[40px] rounded-full cursor-pointer">
                                <MdArrowOutward className="text-primary" size={30} />
                            </div>
                        </>
                }
            </div>
        </div>
    );
};

export default Navbar;
import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const{signIn} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        signIn(data.email, data.password)
        .then(() => {
            navigate(location.state || "/")
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-slate-800 px-4 md:px-8 py-2 md:py-4 ml-0 md:ml-10 lg:ml-20">
            <h1 className="text-4xl font-extrabold py-4 text-center md:text-left">Welcome Back</h1>
            <p className="text-base text-gray-700 pb-7 text-center md:text-left">
                Login with QuickDrop
            </p>

            <div className="max-w-96 w-full">
                {/* Email Field */}
                <label htmlFor="email" className="text-base font-medium">
                    Email Address
                </label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full transition-all overflow-hidden focus-within:ring-2 focus-within:ring-secondary">
                    <FaEnvelope className="text-slate-600" />
                    <input
                        type="email"
                        id="email"
                        className="h-full px-2 w-full outline-none bg-transparent text-base"
                        placeholder="Enter your email address"
                        {...register("email", { required: "Email is required" })}
                    />
                </div>
                {errors.email && <p className="text-[#EF4444] text-sm font-medium">{errors.email.message}</p>}

                {/* Password Field */}
                <label htmlFor="password" className="text-base font-medium mt-4">
                    Password
                </label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full transition-all overflow-hidden focus-within:ring-2 focus-within:ring-secondary">
                    <FaLock className="text-slate-600" />
                    <input
                        type="password"
                        id="password"
                        className="h-full px-2 w-full outline-none bg-transparent text-base"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: "Password must be provided", minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />
                </div>
                {errors.password && <p className="text-[#EF4444] text-sm font-medium">{errors.password.message}</p>}

                {/* Login Button */}
                <button
                    type="submit"
                    className="flex items-center justify-center gap-1 mt-5 bg-primary hover:bg-secondary text-base font-medium text-black hover:text-white py-2.5 w-full rounded-full transition-all duration-300 cursor-pointer"
                >
                    Login
                    <FaArrowRight className="mt-0.5" />
                </button>

                {/* Registration link */}
                <p className="text-sm text-gray-700 text-center mt-4">
                    Don’t have an account?
                    <Link to="/register" className="text-secondary font-extrabold hover:underline ml-1">
                        Register
                    </Link>
                </p>

                {/* OR separator */}
                <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 font-medium text-sm">OR</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Google Sign-In */}
                <button
                    type="button"
                    onClick={() => console.log("Google sign in")}
                    className="flex items-center justify-center gap-2 w-full border border-slate-300 hover:border-none rounded-full py-2.5 text-base font-bold hover:bg-primary transition-all duration-300 cursor-pointer"
                >
                    <FcGoogle className="text-lg" />
                    Login with Google
                </button>
            </div>
        </form>
    );
};

export default Login;

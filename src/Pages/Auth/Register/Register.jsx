import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaArrowRight, FaLink } from "react-icons/fa";
import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";


const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signUp, modifyProfile } = useAuth();
    const axiosInstance = useAxios();
    const [fileName, setFileName] = useState("Choose image file");
    const [imgLink, setImgLink] = useState('');


    const handleImg = async (e) => {
        const image = e.target.files[0];

        if (image) {
            const shortName = image.name.length > 25 ? image.name.slice(0, 25) + "..." : image.name;
            setFileName(shortName);
        }

        const formData = new FormData();
        formData.append("image", image);

        const imgURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_UPLOAD}`;

        const res = await axiosInstance.post(imgURL, formData);
        setImgLink(res.data?.data?.url);
    }


    const onSubmit = (data) => {
        const profileData = {
            displayName: name,
            photoURL: imgLink
        }

        const dbUser = {
            name: data.name,
            email: data.email,
            role: "user", 
            createdAt: new Date().toISOString(), 
            lastSignIn: new Date().toISOString(),
            photoURL: imgLink,
        };

        signUp(data.email, data.password)
            .then(() => {
                modifyProfile(profileData)
                axiosInstance.post('/users', dbUser)
            })
            .catch(error => console.log(error))
    }
    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-slate-800 px-4 md:px-8 py-2 md:py-4 ml-0 md:ml-10 lg:ml-20">
            <h1 className="text-4xl font-extrabold py-4 text-center md:text-left">Welcome Back</h1>
            <p className="text-base text-gray-700 pb-7 text-center md:text-left">
                Register with QuickDrop
            </p>

            <div className="max-w-96 w-full">
                {/* Name Field */}
                <label htmlFor="name" className="text-base font-medium mt-4">
                    Full Name
                </label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full transition-all overflow-hidden focus-within:ring-2 focus-within:ring-secondary">
                    <FaLink className="text-slate-600" />
                    <input
                        type="text"
                        id="name"
                        className="h-full px-2 w-full outline-none bg-transparent text-base"
                        placeholder="Enter your full name"
                        {...register("name", { required: "Name is required" })}
                    />
                </div>
                {errors.name && (
                    <p className="text-[#EF4444] text-sm font-medium">{errors.name.message}</p>
                )}

                {/* File Upload Field */}
                <label htmlFor="profile" className="text-base font-medium mt-4">
                    Upload Profile Image
                </label>
                <div className="flex items-center mt-2 mb-4 h-10 pl-3 pr-3 border border-slate-300 rounded-full transition-all overflow-hidden focus-within:ring-2 focus-within:ring-secondary bg-white">
                    <FaLink className="text-slate-600 mr-2" />

                    <input
                        type="file"
                        id="profile"
                        accept="image/*"
                        className="hidden"
                        {...register("profile", { required: "Profile image is required" })}
                        onChange={handleImg}
                    />

                    <label
                        htmlFor="profile"
                        id="file-name"
                        className="cursor-pointer text-sm text-gray-600 truncate w-full"
                    >
                        {fileName}
                    </label>
                </div>
                {errors.profile && (
                    <p className="text-[#EF4444] text-sm font-medium">{errors.profile.message}</p>
                )}

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
                    Register Now
                    <FaArrowRight className="mt-0.5" />
                </button>

                {/* Registration link */}
                <p className="text-sm text-gray-700 text-center mt-4">
                    Already have an account?
                    <Link to="/login" className="text-secondary font-extrabold hover:underline ml-1">
                        Login
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
                    Register with Google
                </button>
            </div>
        </form>
    );
};

export default Register;

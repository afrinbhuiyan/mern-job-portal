import React from "react";
import { FaFacebookF, FaApple, FaXTwitter } from "react-icons/fa6";
import signupImg from "../assets/authImg.png"; 
import { Link } from "react-router";

const Register = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black/50">
      <div className="bg-[#0B1A0B] rounded-2xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
        
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2 text-white">Open your account</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Already have an account?{" "}
            <span className="text-green-500 cursor-pointer">Sign in</span>
          </p>

          <form className="space-y-4">
            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 rounded-full bg-transparent border border-green-700 focus:border-green-500 outline-none text-sm text-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-full bg-transparent border border-green-700 focus:border-green-500 outline-none text-sm text-white"
              />
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-full bg-transparent border border-green-700 focus:border-green-500 outline-none text-sm text-white"
              />
            </div>

            {/* Create Account Button */}
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition">
              Create Account
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1 border-gray-700" />
            <span className="mx-4 text-gray-400 text-sm">or</span>
            <hr className="flex-1 border-gray-700" />
          </div>

          {/* Social Buttons */}
          <div className="flex justify-center space-x-4">
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white">
              <FaFacebookF />
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white">
              <FaApple />
            </button>
            <button className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 text-white">
              <FaXTwitter />
            </button>
          </div>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-6 text-center">
            By joining, you agree to the <span className="text-green-500">Terms of Service</span> and{" "}
            <span className="text-green-500">Privacy Policy</span>
          </p>
        </div>

        {/* Right - Image */}
        <div className="hidden md:block w-1/2 relative m-6">
          <img
            src={signupImg}
            alt="Signup"
            className="w-full h-full object-cover"
          />
          <Link to={"/"} className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-green-500 font-bold border border-gray-600">
            ✕
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

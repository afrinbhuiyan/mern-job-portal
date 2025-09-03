import React, { useState, useContext } from "react";
import { FaFacebookF, FaApple, FaXTwitter } from "react-icons/fa6";
import signupImg from "../assets/authImg.png";
import { Link, Navigate, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return Swal.fire("Error", "Passwords do not match!", "error");
    }

    try {
      // Call AuthContext register
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      Swal.fire("Success!", "Account created successfully!", "success");

      // Optional: redirect to dashboard or home
      navigate("/");
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.msg || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black/50">
      <div className="bg-[#0B1A0B] rounded-2xl shadow-2xl overflow-hidden flex max-w-5xl w-full">
        {/* Left - Form */}
        <div className="w-full md:w-1/2 p-10">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Open your account
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-green-500 cursor-pointer">
              Sign in
            </Link>
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-transparent border border-green-700 focus:border-green-500 outline-none text-sm text-white"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-transparent border border-green-700 focus:border-green-500 outline-none text-sm text-white"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-transparent border border-green-700 focus:border-green-500 outline-none text-sm text-white"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-full bg-transparent border border-green-700 focus:border-green-500 outline-none text-sm text-white"
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-full transition"
            >
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
            By joining, you agree to the{" "}
            <span className="text-green-500">Terms of Service</span> and{" "}
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
          <Link
            to="/"
            className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-green-500 font-bold border border-gray-600"
          >
            ✕
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;

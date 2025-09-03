import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";
import postImg from "../assets/postImg.jpg";

const Footer = () => {
  return (
    <footer className="bg-[#0B1A0B] text-white">
      {/* Top CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 border-b border-green-900/40">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <h2 className="text-2xl md:text-3xl font-bold leading-snug text-center md:text-left lg:w-1/2">
            Reach Your Requirement Goals Right on Schedule
          </h2>
          <div className="flex justify-center md:justify-end lg:items-end">
            <div className="text-center md:text-left">
              <p className="text-[#ffffff96] text-sm md:text-base max-w-md">
                Sign up, complete your profile, and start browsing projects.
                Submit proposals and communicate with clients to get hired.
              </p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 mt-3 rounded-full transition public-sans">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row flex-wrap lg:flex-nowrap">
        {/* Logo + Social */}
        <div className="flex flex-col items-start space-y-4 mt-10 lg:w-1/4">
          <img src={logo} alt="Logo" className="w-48" />
        </div>

        {/* About */}
        <div className="py-6 px-0 sm:px-6 lg:px-8 lg:w-1/4">
          <h3 className="font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/about" className="hover:text-green-400">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/seller" className="hover:text-green-400">
                Become Seller
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-green-400">
                ProProJobs
              </Link>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="py-6 px-0 sm:px-6 lg:px-8 border-b lg:border-b-0 lg:border-l border-green-900/40 lg:w-1/4">
          <h3 className="font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Design & Creative</li>
            <li>Development & IT</li>
            <li>Music & Audio</li>
            <li>Programming & Tech</li>
          </ul>
        </div>

        {/* Support */}
        <div className="py-6 px-0 sm:px-6 lg:px-8 border-b lg:border-b-0 lg:border-l border-green-900/40 lg:w-1/4">
          <h3 className="font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/support" className="hover:text-green-400">
                Help & Support
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-green-400">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-green-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-green-400">
                Terms & Services
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Popular Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row bg-[url(/src/assets/footer-blur-bg.png)] bg-no-repeat bg-contain">
        <div className="flex-1 mb-6 lg:mb-0">
          <div className="flex space-x-3">
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 transition"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-6">Our Popular Post</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2].map((post, i) => (
              <div key={i} className="flex items-center space-x-4">
                <img
                  src={postImg}
                  alt="post"
                  className="w-20 h-14 object-cover rounded"
                />
                <div>
                  <p className="text-xs text-gray-400">November 7, 2024</p>
                  <p className="text-sm font-medium hover:text-green-400 cursor-pointer">
                    Unveils the Best Canadian Cities for Biking
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-green-900/40 py-6 text-center text-sm text-gray-400">
        © QuantumEdge Software INC. 2025. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

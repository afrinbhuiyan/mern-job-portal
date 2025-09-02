import React, { useState } from "react";
import { FiChevronDown, FiMenu, FiX } from "react-icons/fi";
import { TbCategory } from "react-icons/tb";
import { Link, NavLink } from "react-router";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import SearchBar from "./SearchBar";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-black bg-[url(/src/assets/header-blur-bg.png)] bg-no-repeat bg-left-top relative overflow-hidden z-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Nav */}
        <div className="border-b border-[#CCCCCC1A] px-4 md:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo + Categories */}
            <div className="flex items-center space-x-3">
              <Link to="/">
                <img className="w-32 sm:w-36 md:w-48" src={logo} alt="Logo" />
              </Link>
              <button className="hidden md:flex items-center space-x-2 px-4 py-1 rounded-full text-sm transition-all duration-200 border border-[#05AF2B] text-[#05AF2B] hover:bg-green-600/20">
                <TbCategory />
                <span>Categories</span>
              </button>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <NavLink
                to="/freelancer"
                className={({ isActive }) =>
                  `flex items-center space-x-1 px-3 py-2 rounded-md text-white hover:bg-gray-700 transition ${
                    isActive ? "bg-gray-800" : ""
                  }`
                }
              >
                <span>Freelancer</span>
                <FiChevronDown />
              </NavLink>
              <Link
                to="/seller"
                className="text-green-400 hover:text-green-300 text-sm font-semibold tracking-wide transition-colors duration-200"
              >
                BECOME A SELLER
              </Link>
              <Link
                to="/login"
                className="text-white hover:text-green-300 text-sm font-medium transition-colors duration-200"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                className="bg-[#05AF2B] hover:bg-green-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-lg"
              >
                Registration
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            className="md:hidden bg-black px-4 py-4 border-b border-[#CCCCCC1A]"
          >
            <nav className="flex flex-col space-y-3">
              <Link
                to="/freelancer"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                Freelancer
              </Link>
              <Link
                to="/seller"
                onClick={() => setMenuOpen(false)}
                className="text-green-400"
              >
                BECOME A SELLER
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-white"
              >
                LOGIN
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="bg-[#05AF2B] text-white px-4 py-2 rounded-full"
              >
                Registration
              </Link>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Search Bar Section */}
    </header>
  );
};

export default Header;

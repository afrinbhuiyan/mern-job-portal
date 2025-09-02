import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import Star from "../assets/Star.png";
import { useNavigate } from 'react-router';

const SearchBar = ({setMenuOpen}) => {
    
      const [searchQuery, setSearchQuery] = useState("");
      const navigate = useNavigate();

  const handleInputChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/jobs?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };
    return (
        <div className='max-w-7xl mx-auto'>
            {/* Search Section */}
        <div className="flex py-24 lg:max-w-1/2 px-4">
        <div>
          <img className="absolute right-96" src={Star} alt="" />
        </div>
          <div className="w-full">
            <form
              onSubmit={handleSearchSubmit}
              className="md:flex items-center gap-2 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl"
            >
              {/* Search Input */}
              <motion.div className="p-[1px] rounded-lg animated-gradient">
                <motion.div
                  className="relative w-full flex items-center px-4 py-1 rounded-lg bg-[#1a1a1a]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Input */}
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search your needs"
                    className="flex-1 px-4 py-2 text-white placeholder-gray-300 bg-transparent focus:outline-none"
                  />

                  {/* Category Dropdown */}
                  <div className="relative">
                    <select
                      className="bg-transparent text-white px-4 py-2 focus:outline-none appearance-none cursor-pointer text-sm"
                      defaultValue="web-developer"
                    >
                      <option className="text-black" value="web-developer">
                        Web Developer
                      </option>
                      <option className="text-black" value="mobile-developer">
                        Mobile Developer
                      </option>
                      <option className="text-black" value="ui-designer">
                        UI/UX Designer
                      </option>
                      <option className="text-black" value="data-scientist">
                        Data Scientist
                      </option>
                    </select>
                    <FiChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-green-300 w-4 h-4 pointer-events-none" />
                  </div>

                  {/* Search Button */}
                  <button
                    type="submit"
                    className="ml-2 w-9 h-9 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors duration-200"
                    aria-label="Search"
                  >
                    <FiSearch />
                  </button>
                </motion.div>
              </motion.div>

              {/* Advanced Search */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full text-sm font-medium transition-colors duration-200 w-48"
              >
                Advanced search
              </button>
            </form>
          </div>
        </div>
        </div>
    );
};

export default SearchBar;
import React, { useState } from "react";
import AddJob from "./AddJob";
import JobListings from "./JobListings";

const Seller = () => {
  const [activeTab, setActiveTab] = useState("listings");
  
  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <header className="bg-white p-6 lg:p-0 mb-8">
        <h1 className="text-3xl font-bold text-green-800">Seller Dashboard</h1>
        <p className="text-green-600 mt-2">Manage your job postings and applications</p>
      </header>
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-green-200 mb-6">
        <button
          className={`py-3 px-6 font-medium rounded-t-lg transition-all ${
            activeTab === "listings"
              ? "bg-black text-white"
              : "bg-white text-green-600 hover:bg-green-100"
          }`}
          onClick={() => setActiveTab("listings")}
        >
          Job Listings
        </button>
        <button
          className={`py-3 px-6 font-medium rounded-t-lg transition-all ${
            activeTab === "add"
              ? "bg-black text-white"
              : "bg-white text-green-600 hover:bg-green-100"
          }`}
          onClick={() => setActiveTab("add")}
        >
          Add New Job
        </button>
      </div>
      
      {/* Main Content */}
      <main className="bg-white p-6 lg:p-0">
        {activeTab === "listings" ? <JobListings /> : <AddJob />}
      </main>
      
      {/* Stats Footer */}
      <footer className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-green-800 font-semibold">Active Listings</h3>
          <p className="text-2xl font-bold text-green-600">12</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-green-800 font-semibold">Applications</h3>
          <p className="text-2xl font-bold text-green-600">48</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-sm">
          <h3 className="text-green-800 font-semibold">Profile Views</h3>
          <p className="text-2xl font-bold text-green-600">127</p>
        </div>
      </footer>
    </div>
  );
};

export default Seller;
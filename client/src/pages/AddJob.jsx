import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";
import { createJob } from "../api/jobs";
import { FiBriefcase, FiMapPin, FiDollarSign, FiFileText, FiCode, FiGlobe, FiPlus } from "react-icons/fi";

const AddJob = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    price: "",
    remoteOnsite: "Onsite",
    technologies: "",
  });

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-4">You need to be logged in to post a job.</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      return Swal.fire("Error", "You must be logged in to add a job", "error");
    }

    const jobPayload = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    };

    try {
      setLoading(true);
      const newJob = await createJob(jobPayload, token);
      
      Swal.fire({
        title: "Success!",
        text: "Job posted successfully!",
        icon: "success",
        confirmButtonColor: "#10B981",
        confirmButtonText: "Continue"
      });

      setFormData({
        title: "",
        company: "",
        location: "",
        description: "",
        price: "",
        remoteOnsite: "Onsite",
        technologies: "",
      });
    } catch (err) {
      console.error(err);
      Swal.fire(
        "Error",
        err.response?.data?.msg || "Failed to create job",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">Post a New Job</h1>
          <p className="text-green-700">Reach qualified professionals with your job posting</p>
        </div>

        <div className="bg-white overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white rounded-2xl">
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <FiPlus className="text-xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Create Job Listing</h2>
                <p className="opacity-90">Fill in the details below to post your job</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form className="p-6 space-y-6" onSubmit={handleSubmit}>
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiBriefcase className="mr-2 text-green-600" />
                Job Title *
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Senior Web Developer"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Company & Location Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="company"
                  placeholder="Your company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiMapPin className="mr-2 text-green-600" />
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. New York, NY or Remote"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            {/* Work Type & Budget Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiGlobe className="mr-2 text-green-600" />
                  Work Type *
                </label>
                <select
                  name="remoteOnsite"
                  value={formData.remoteOnsite}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <FiDollarSign className="mr-2 text-green-600" />
                  Budget (Optional)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 5000"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiFileText className="mr-2 text-green-600" />
                Job Description *
              </label>
              <textarea
                name="description"
                placeholder="Describe the responsibilities, requirements, and benefits of this position..."
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                required
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FiCode className="mr-2 text-green-600" />
                Required Technologies
              </label>
              <input
                type="text"
                name="technologies"
                placeholder="e.g. React, Node.js, MongoDB (comma separated)"
                value={formData.technologies}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
              <p className="text-xs text-gray-500 mt-2">Separate technologies with commas</p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Posting Job...
                  </>
                ) : (
                  "Post Job"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-green-50 rounded-2xl p-6 border border-green-200">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            Tips for a great job post
          </h3>
          <ul className="text-green-700 text-sm space-y-2">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Be specific about role responsibilities
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Include required skills and experience level
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Mention your company culture and benefits
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Add a budget range to attract qualified candidates
            </li>
          </ul>
        </div>
      </div>
  );
};

export default AddJob;
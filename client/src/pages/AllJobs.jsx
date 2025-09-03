import { useEffect, useState } from "react";
import { getAllJobsPublic } from "../api/jobs";
import {
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiUser,
  FiClock,
  FiBookmark,
} from "react-icons/fi";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getAllJobsPublic();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch public jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Available Jobs
          </h1>
          <p className="text-gray-600">
            Browse through our latest job opportunities and find the perfect
            match for your skills
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <FiBriefcase className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No jobs available
            </h3>
            <p className="text-gray-500">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                {/* Job Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {job.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Fixed Price Project
                      </p>
                    </div>
                    <button className="text-gray-400 hover:text-green-600 transition-colors">
                      <FiBookmark size={20} />
                    </button>
                  </div>

                  {/* Price Range */}
                  <div className="flex items-center text-green-700 font-semibold mb-4">
                    <FiDollarSign className="mr-1" />
                    <span>
                      {formatPrice(job.price - 200)}-{formatPrice(job.price)}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {job.description}
                  </p>

                  {/* Job Meta */}
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      <FiMapPin className="mr-1" size={14} />
                      {job.remoteOnsite}
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                      Senior level
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                      2 Freelancer
                    </span>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.technologies?.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {job.technologies?.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{job.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <FiUser className="text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Posted by <strong>Eamman</strong>
                        </p>
                        <p className="text-xs text-gray-500">
                          <FiClock className="inline mr-1" size={12} />
                          {getTimeAgo(job.createdAt)}
                        </p>
                      </div>
                    </div>
                    <button className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden font-bold text-white rounded-full group">
                      <span className="absolute inset-0 w-full h-full bg-black transition-all duration-300 group-hover:bg-green-700"></span>
                      <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-white opacity-10 group-hover:-translate-x-8"></span>
                      <span className="relative z-10">Apply Now</span>
                      <span className="absolute inset-0 rounded-full transition-colors duration-300"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllJobs;

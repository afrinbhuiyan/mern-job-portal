import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { getJobs, updateJob, deleteJob } from "../api/jobs";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiTag,
  FiEdit2,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
  FiX,
  FiSave,
  FiCheck,
  FiXCircle,
} from "react-icons/fi";
import Swal from "sweetalert2";

const JobListings = () => {
  const { user } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
        setFilteredJobs(data);
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      }
    };

    if (user) fetchJobs();
  }, [user]);

  // Filter jobs based on all criteria
  useEffect(() => {
    let result = jobs;

    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((job) => job.status === statusFilter);
    }

    if (locationFilter) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter !== "all") {
      result = result.filter((job) => job.remoteOnsite === typeFilter);
    }

    if (priceRange.min) {
      result = result.filter(
        (job) => parseInt(job.price || 0) >= parseInt(priceRange.min)
      );
    }

    if (priceRange.max) {
      result = result.filter(
        (job) => parseInt(job.price || 0) <= parseInt(priceRange.max)
      );
    }

    setFilteredJobs(result);
  }, [searchTerm, statusFilter, locationFilter, typeFilter, priceRange, jobs]);

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

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setLocationFilter("");
    setTypeFilter("all");
    setPriceRange({ min: "", max: "" });
  };

  const hasActiveFilters =
    searchTerm ||
    statusFilter !== "all" ||
    locationFilter ||
    typeFilter !== "all" ||
    priceRange.min ||
    priceRange.max;

  // Start editing a job
  const handleEditClick = (job) => {
    setEditingJobId(job._id);
    setEditFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      price: job.price,
      remoteOnsite: job.remoteOnsite,
      technologies: job.technologies.join(", "),
    });
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  // Save edited job
  const handleSaveClick = async (jobId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const updatedJobData = {
        ...editFormData,
        technologies: editFormData.technologies
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const updatedJob = await updateJob(jobId, updatedJobData, token);

      // Update the jobs list with the updated job
      setJobs(jobs.map((job) => (job._id === jobId ? updatedJob : job)));
      setEditingJobId(null);
      setEditFormData({});

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Job updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to update job:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update job. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingJobId(null);
    setEditFormData({});
  };

  // Delete job
  const handleDeleteJob = async (jobId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await deleteJob(jobId, token);

      // Remove the job from the list
      setJobs(jobs.filter((job) => job._id !== jobId));
      setDeleteConfirm(null);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Job deleted successfully",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Failed to delete job:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete job. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Confirm delete
  const confirmDelete = (jobId) => {
    setDeleteConfirm(jobId);
  };

  // Cancel delete
  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-900 mb-2">
            Your Job Listings
          </h1>
          <p className="text-green-700">
            Manage and track all your posted jobs in one place
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-green-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Jobs</p>
                <p className="text-2xl font-bold text-green-800">
                  {jobs.length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FiBriefcase className="text-green-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Active Jobs</p>
                <p className="text-2xl font-bold text-blue-800">
                  {jobs.filter((job) => job.status === "active").length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FiEye className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-purple-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Applications</p>
                <p className="text-2xl font-bold text-purple-800">24</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FiBriefcase className="text-purple-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-4 border-l-4 border-amber-500">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold text-amber-800">
                  {formatPrice(
                    jobs.reduce((sum, job) => sum + parseInt(job.price || 0), 0)
                  )}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <FiDollarSign className="text-amber-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg w-full justify-center"
          >
            <FiFilter />
            {isFilterOpen ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filter Sidebar */}
          <div
            className={`lg:w-1/4 bg-white rounded-xl shadow-md p-6 h-fit ${
              isFilterOpen ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <FiFilter className="mr-2 text-green-600" />
                Filters
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-green-600 hover:text-green-800"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-6">
              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Filter by location..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                />
              </div>

              {/* Job Type Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Type
                </label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="all">All Types</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Price Range Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    placeholder="Min $"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, min: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Max $"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange({ ...priceRange, max: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Jobs List - Right Side */}
          <div className="lg:w-3/4">
            {/* Results Count */}
            <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex justify-between items-center">
              <p className="text-gray-700">
                Showing{" "}
                <span className="font-semibold">{filteredJobs.length}</span> of{" "}
                <span className="font-semibold">{jobs.length}</span> jobs
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-sm text-red-600 hover:text-red-800"
                >
                  <FiX className="mr-1" />
                  Clear filters
                </button>
              )}
            </div>

            {/* Jobs Grid */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <FiBriefcase className="text-green-600 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your filters or create a new job posting
                </p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  Post a Job
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg border border-gray-100"
                  >
                    <div className="p-6">
                      {editingJobId === job._id ? (
                        // Edit Mode
                        <div className="space-y-4">
                          <input
                            type="text"
                            name="title"
                            value={editFormData.title}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Job Title"
                          />
                          <input
                            type="text"
                            name="company"
                            value={editFormData.company}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Company"
                          />
                          <input
                            type="text"
                            name="location"
                            value={editFormData.location}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Location"
                          />
                          <input
                            type="number"
                            name="price"
                            value={editFormData.price}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Price"
                          />
                          <select
                            name="remoteOnsite"
                            value={editFormData.remoteOnsite}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                          >
                            <option value="Onsite">Onsite</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                          </select>
                          <textarea
                            name="description"
                            value={editFormData.description}
                            onChange={handleEditChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Description"
                          />
                          <input
                            type="text"
                            name="technologies"
                            value={editFormData.technologies}
                            onChange={handleEditChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                            placeholder="Technologies (comma separated)"
                          />

                          <div className="flex justify-between pt-2">
                            <button
                              onClick={() => handleSaveClick(job._id)}
                              disabled={loading}
                              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                            >
                              <FiSave size={16} />
                              {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center gap-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                            >
                              <FiXCircle size={16} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <>
                          <div className="flex items-start justify-between mb-4">
                            <h3 className="text-xl font-bold text-green-900">
                              {job.title}
                            </h3>
                            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
                              Active
                            </span>
                          </div>

                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-gray-600">
                              <FiBriefcase className="mr-2 text-green-600" />
                              <span>{job.company}</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <FiMapPin className="mr-2 text-green-600" />
                              <span>{job.location}</span>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <FiDollarSign className="mr-2 text-green-600" />
                              <span className="font-semibold">
                                {formatPrice(job.price)}
                              </span>
                            </div>

                            <div className="flex items-center text-gray-600">
                              <FiClock className="mr-2 text-green-600" />
                              <span>{getTimeAgo(job.createdAt)}</span>
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                            {job.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {job.technologies.slice(0, 3).map((tech, index) => (
                              <span
                                key={index}
                                className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                            {job.technologies.length > 3 && (
                              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                                +{job.technologies.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                            <span className="text-sm text-green-700">
                              {job.remoteOnsite}
                            </span>
                            <div className="flex gap-2">
                              <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                                <FiEye size={16} />
                              </button>
                              <button
                                onClick={() => handleEditClick(job)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              >
                                <FiEdit2 size={16} />
                              </button>

                              {deleteConfirm === job._id ? (
                                <div className="flex gap-1">
                                  <button
                                    onClick={() => handleDeleteJob(job._id)}
                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    disabled={loading}
                                  >
                                    <FiCheck size={16} />
                                  </button>
                                  <button
                                    onClick={cancelDelete}
                                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                                  >
                                    <FiX size={16} />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => confirmDelete(job._id)}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListings;

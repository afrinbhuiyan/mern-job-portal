import axios from "axios";

const API_URL = "http://localhost:5000/api/jobs";

//  Protected: Get logged-in user's jobs
export const getJobs = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

//  Public: Get all jobs (no auth required)
export const getAllJobsPublic = async () => {
  const response = await axios.get(`${API_URL}/public`);
  return response.data;
};

// Create job (auth required)
export const createJob = async (jobData, token) => {
  const res = await axios.post(API_URL, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Update job (auth required)
export const updateJob = async (id, jobData, token) => {
  const res = await axios.put(`${API_URL}/${id}`, jobData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Delete job (auth required)
export const deleteJob = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

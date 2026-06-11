// src/api/axiosClient.js
import axios from "axios";

const apiHost = window.location.hostname || "localhost";
const apiProtocol = window.location.protocol || "http:";
const envApiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const fallbackApiBaseUrl = `${apiProtocol}//${apiHost}:3000/api/v1`;

const api = axios.create({
  baseURL: envApiBaseUrl || fallbackApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Tự động gắn token vào header nếu có
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

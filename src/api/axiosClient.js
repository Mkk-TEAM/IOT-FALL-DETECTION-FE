// src/api/axiosClient.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // SỬA TẠI ĐÂY: Đổi localStorage thành sessionStorage
  const token = sessionStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
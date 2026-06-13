import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Cấu hình URL Backend thực tế của bạn
  timeout: 10000,
});

// Gắn token tự động giống bài trước
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const deviceApi = {
  // Gọi tới DeviceService.list
  getDevices: (params) => API.get("/devices", { params }),
  
  // Gọi tới DeviceService.create
  createDevice: (data) => API.post("/devices", data),
  
  // Gọi tới DeviceStatusLogService.latest để lấy tín hiệu mạng (RSSI) mới nhất của các thiết bị
  getLatestStatusLogs: (params) => API.get("/device-status-logs/latest", { params }),
};
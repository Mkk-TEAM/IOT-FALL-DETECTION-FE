import API from "./axiosClient";

export const deviceApi = {
  // Gọi tới DeviceService.list
  getDevices: (params) => API.get("/devices", { params }),
  
  // Gọi tới DeviceService.create
  createDevice: (data) => API.post("/devices", data),
  
  // Gọi tới DeviceStatusLogService.latest để lấy tín hiệu mạng (RSSI) mới nhất của các thiết bị
  getLatestStatusLogs: (params) => API.get("/device-status-logs/latest", { params }),
};
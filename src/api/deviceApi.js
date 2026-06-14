import api from "./axiosClient";

export const deviceApi = {
  // Lấy danh sách thiết bị
  getDevices: async (params) => {
    return api.get("/devices", { params });
  },

  // Thêm thiết bị mới
  createDevice: async (data) => {
    return api.post("/devices", data);
  },

  // Xóa thiết bị
  deleteDevice: async (deviceId) => {
    return api.delete(`/devices/${deviceId}`);
  },

  // Lấy log trạng thái mới nhất của tất cả thiết bị (Để map RSSI)
  getLatestStatusLogs: async (params) => {
    // Lưu ý: Sửa lại đường dẫn này cho khớp với file Router backend của bạn
    return api.get("/device-status-logs/latest", { params }); 
  },

  // Lấy lịch sử log chi tiết của 1 thiết bị cụ thể (Phục vụ cho Popup chi tiết)
  getDeviceStatusLogs: async (params) => {
    return api.get("/device-status-logs", { params });
  },
};
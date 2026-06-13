import axios from "axios";

// 1. Khởi tạo cấu hình Axios instance gốc (nếu dự án của bạn đã có file axios chung thì có thể import vào thay thế)
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Thay cổng port hoặc domain này bằng cấu hình thực tế Backend của bạn
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Tự động đính kèm Access Token vào Header để Backend xác thực (Middleware Interceptor)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Định nghĩa các hàm gọi Endpoint tương ứng với NotificationService của Backend
export const notificationApi = {
  /**
   * Lấy danh sách nhật ký gửi cảnh báo (Phân trang + Bộ lọc)
   * @param {Object} params - Chứa các trường { page, pageSize, channel, deliveryStatus, eventId }
   */
  listLogs: async (params) => {
    return API.get("/notifications/logs", { params }); // Khớp với Endpoint định tuyến ở BE của bạn
  },

  /**
   * Tạo một log mới thủ công (Nếu giao diện cần dùng)
   */
  createLog: async (data) => {
    return API.post("/notifications/logs", data);
  },

  /**
   * Kích hoạt gửi thông báo sự kiện khẩn cấp
   * @param {string} eventId - ID của sự kiện (ví dụ: ngã, nhịp tim cao)
   * @param {Object} payload - { channels: ["EMAIL"], recipients: ["abc@gmail.com"] }
   */
  sendEventNotification: async (eventId, payload) => {
    return API.post(`/notifications/events/${eventId}/send`, payload);
  },
};
// Thay vì import raw axios, hãy import axiosClient mà bạn đã cấu hình Token
import api from "./axiosClient";

export const notificationApi = {
  /**
   * Lấy danh sách nhật ký gửi cảnh báo (Phân trang + Bộ lọc)
   * @param {Object} params - Chứa các trường { page, pageSize, channel, deliveryStatus, eventId }
   */
  listLogs: async (params) => {
    // Sửa API thành api (instance từ axiosClient)
    return api.get("/notifications/logs", { params }); 
  },

  /**
   * Tạo một log mới thủ công (Nếu giao diện cần dùng)
   */
  createLog: async (data) => {
    return api.post("/notifications/logs", data);
  },

  /**
   * Kích hoạt gửi thông báo sự kiện khẩn cấp
   * @param {string} eventId - ID của sự kiện (ví dụ: ngã, nhịp tim cao)
   * @param {Object} payload - { channels: ["EMAIL"], recipients: ["abc@gmail.com"] }
   */
  sendEventNotification: async (eventId, payload) => {
    return api.post(`/notifications/events/${eventId}/send`, payload);
  },
};
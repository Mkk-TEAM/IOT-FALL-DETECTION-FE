import api from "./axiosClient";

export const streamApi = {
  /**
   * 1. Khởi tạo phiên xem Camera (WebRTC Session)
   * Tương ứng với Backend: StreamService.createSession
   * @param {string} deviceId - ID của Camera cần xem
   */
  createSession: async (deviceId) => {
    return api.post("/stream/sessions", { deviceId });
  },

  /**
   * 2. Lấy thông tin phiên Stream hiện tại (Nếu cần thiết)
   * Tương ứng với Backend: StreamService.getSession
   * @param {string} sessionId - ID của phiên
   */
  getSession: async (sessionId) => {
    return api.get(`/stream/sessions/${sessionId}`);
  },

  /**
   * 3. Đóng phiên xem Camera (Giải phóng tài nguyên Server)
   * Tương ứng với Backend: StreamService.closeSession
   * @param {string} sessionId - ID của phiên cần đóng
   */
  closeSession: async (sessionId) => {
    return api.delete(`/stream/sessions/${sessionId}`);
  },
};
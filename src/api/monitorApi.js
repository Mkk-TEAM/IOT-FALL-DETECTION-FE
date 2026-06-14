import api from "./axiosClient";

export const monitorApi = {
  // Giả định Backend có 1 endpoint trả về toàn bộ trạng thái của 1 Gateway (Phòng)
  // Bao gồm: thông tin người bệnh, danh sách thiết bị (camera, vòng đeo tay), pin, và trạng thái an toàn
  getRoomStatus: async (gatewayId) => {
    return api.get(`/monitor/gateways/${gatewayId}/status`);
  },
};
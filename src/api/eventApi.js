import api from "./axiosClient";

const eventApi = {
  // Lấy danh sách sự kiện (hỗ trợ phân trang, lọc)
  getEvents: (params) => {
    return api.get("/events", { params });
  },

  // (Ví dụ) Lấy chi tiết 1 sự kiện theo ID - bạn có thể dùng sau này
  getEventById: (id) => {
    return api.get(`/events/${id}`);
  },

  // (Ví dụ) Cập nhật trạng thái sự kiện - bạn có thể dùng sau này
  updateStatus: (id, status) => {
    return api.patch(`/events/${id}/status`, { status });
  },
};

export default eventApi;
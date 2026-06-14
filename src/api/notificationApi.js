import api from "./axiosClient";

export const notificationApi = {
  listLogs: async (params) => {
    return api.get("/notifications/logs", { params });
  },

  createLog: async (data) => {
    return api.post("/notifications/logs", data);
  },

  sendEventNotification: async (eventId, payload) => {
    return api.post(`/notifications/events/${eventId}/send`, payload);
  },
};

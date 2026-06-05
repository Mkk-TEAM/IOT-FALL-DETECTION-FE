// src/api/authApi.js

import api from "./axiosClient";

export const authApi = {
  login(data) {
    return api.post("/auth/login", data);
  },

  register(data) {
    return api.post("/auth/register", data);
  },

  registerStaff(data) {
    return api.post("/staff/register", data);
  },

  sendOtp(data) {
    return api.post("/auth/send-otp", data);
  },

  verifyOtp(data) {
    return api.post("/auth/verify-otp", data);
  },

  verifyForgot(data) {
    return api.post("/auth/forgot-password/verify", data);
  },

  resetPassword(data) {
    return api.post("/auth/forgot-password/reset", data);
  },
};

// src/api/authApi.js

import api from "./axiosClient";

export const authApi = {
  login(data) {
    return api.post("/auth/login", data);
  },

  sendRegisterOtp(data) {
    return api.post("/auth/register/otp", data);
  },

  register(data) {
    return api.post("/auth/register", data);
  },

  verifyForgot(data) {
    return api.post(
      "/auth/forgot-password/verify",
      data
    );
  },

  resetPassword(data) {
    return api.post(
      "/auth/forgot-password/reset",
      data
    );
  },
};
import api from "./axiosClient";

export const streamApi = {
  getGatewayStream(gatewayId) {
    return api.get(`/streams/${gatewayId}`);
  },
};

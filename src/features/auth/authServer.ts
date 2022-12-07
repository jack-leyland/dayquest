import axios from "axios";
import getDeviceId from "../../common/util/getDeviceId";

const authServer = axios.create({
  baseURL: "http://192.168.1.17:8080/auth/",
  timeout: 2000,
});

authServer.interceptors.request.use(
  async (config) => {
    const deviceId = await getDeviceId();
    config.headers = {
      device: deviceId,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default authServer;

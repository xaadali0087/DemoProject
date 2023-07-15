import axios, { AxiosInstance } from "axios";
import { store } from "../store";
import defaultConfig from "./config";

const ApiClient = () => {
  const instance = axios.create({
    baseURL: defaultConfig.Base_URL,
  });
  instance.interceptors.request.use(async (request) => {
    const authToken = store.getState()?.user?.accessToken;

    if (authToken) {
      request.headers.Authorization = `Bearer ${authToken}`;
    }
    return request;
  });
  return instance;
};
export default ApiClient();

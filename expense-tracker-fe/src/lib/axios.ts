import axios, { AxiosResponse } from "axios";
import { ApiResponse } from "../type/app.type";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (response): AxiosResponse<ApiResponse> => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error.response?.data);
  }
);

export default axiosInstance;

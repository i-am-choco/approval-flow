import { message } from "antd";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
export const api: AxiosInstance = axios.create({
  baseURL: "your own url",
  headers: {
    common: {
      Authorization: "your own token",
    },
  },
});

api.interceptors.response.use(
  (response: AxiosResponse<any>) => {
    message.success(response.data.message ?? "success");

    return response;
  },
  (error: AxiosError<any>) => {
    if (error.response?.data) {
      // return Promise.reject(error.response.data);
    }
  },
);

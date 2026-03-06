import axios, { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./env";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const apiClient = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const response = await axiosInstance.request<T>(config);
  return response.data;
};
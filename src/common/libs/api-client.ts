import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { BASE_URL } from "./env";

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

export const apiClient = async <T>(config: AxiosRequestConfig): Promise<T | null> => {
    try {
        const response = await axiosInstance.request<T>(config);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // kalau server ada tapi error
            if (error.response) {
                console.error("API ERROR:", error.response.status, error.response.data);
            }

            // kalau server mati
            if (error.request) {
                console.error("SERVER OFFLINE:", error.message);
            }
        } else {
            console.error("UNKNOWN ERROR:", error);
        }

        return null;
    }
};

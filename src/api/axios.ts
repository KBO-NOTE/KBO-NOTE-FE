import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { refreshAccessToken } from "./auth";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

let isRefreshing = false;
let pendingRequests: Array<(token?: string) => void> = [];

const subscribeTokenRefresh = (cb: (token?: string) => void) => {
  pendingRequests.push(cb);
};

const onRefreshed = (token?: string) => {
  pendingRequests.forEach((cb) => cb(token));
  pendingRequests = [];
};

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as (InternalAxiosRequestConfig & {
      _retry?: boolean;
    }) | null;

    if (!originalConfig || originalConfig._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token) => {
          if (!token) {
            reject(error);
            return;
          }
          originalConfig.headers = originalConfig.headers ?? {};
          originalConfig.headers.Authorization = `Bearer ${token}`;
          resolve(instance(originalConfig));
        });
      });
    }

    originalConfig._retry = true;
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      onRefreshed(newAccessToken);

      if (!newAccessToken) {
        throw new Error("Refresh failed");
      }

      originalConfig.headers = originalConfig.headers ?? {};
      originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;
      return instance(originalConfig);
    } catch (refreshError) {
      onRefreshed(undefined);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login?error=true";
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default instance;

import ky from "ky";
import { refreshAccessToken } from "./auth";

let refreshPromise: Promise<string | undefined> | null = null;

const getFreshAccessToken = async () => {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

const api = ky.create({
  prefixUrl: "/api",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) {
          return response;
        }

        const isRefreshRequest = request.url.includes("/auth/refresh");
        const alreadyRetried = request.headers.get("x-refresh-retry") === "1";
        const hasRefreshToken = !!localStorage.getItem("refreshToken");

        if (isRefreshRequest || alreadyRetried || !hasRefreshToken) {
          return response;
        }

        try {
          const newAccessToken = await getFreshAccessToken();

          if (!newAccessToken) {
            return response;
          }

          const headers = new Headers(request.headers);
          headers.set("Authorization", `Bearer ${newAccessToken}`);
          headers.set("x-refresh-retry", "1");

          return ky(request, {
            ...options,
            headers,
          });
        } catch {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");

          if (window.location.pathname !== "/login") {
            window.location.href = "/login?error=true";
          }

          return response;
        }
      },
    ],
  },
});

export default api;

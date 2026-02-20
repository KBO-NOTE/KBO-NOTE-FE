import axios from "axios";

const BASE_URL = "http://203.252.131.18:4530";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token");
  }

  const res = await axios.post(
    `${BASE_URL}/auth/refresh`,
    { refreshToken },
    { headers: { "Content-Type": "application/json" } }
  );

  const accessToken = res.data?.accessToken;
  const newRefreshToken = res.data?.refreshToken;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }
  if (newRefreshToken) {
    localStorage.setItem("refreshToken", newRefreshToken);
  }

  return accessToken as string | undefined;
};

export const logout = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    await axios.post(
      `${BASE_URL}/auth/logout`,
      null,
      accessToken
        ? { headers: { Authorization: `Bearer ${accessToken}` } }
        : undefined
    );
  } finally {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

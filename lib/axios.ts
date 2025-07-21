import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000/",
  validateStatus(status) {
    return status < 500;
  },
});

export const axiosNoUser = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8000/",
  validateStatus(status) {
    return status < 500;
  },
});
export const midFetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MID_URL,
  validateStatus(status) {
    return status < 500;
  },
});

fetcher.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

fetcher.interceptors.response.use(
  (response) => {
    if (response.status >= 500) {
      toast.error("server error");
    } else if (response.status >= 400) {
      toast.error(
        response.data.detail || response.data.error || "unknown error"
      );
    } else if (response.data.detail) {
      toast.success(response.data.detail);
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration, e.g., refresh the token
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    }

    return Promise.reject(error);
  }
);

export default fetcher;

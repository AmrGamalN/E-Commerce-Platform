import axios from "axios";
// Set up the base URL and any default configurations for Axios
const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_API_URL_PROD : process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 25000,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized, please log in.");
      // Optional: redirect to login page or trigger logout
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

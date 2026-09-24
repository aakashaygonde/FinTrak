import axios from 'axios';
import { BASE_URL, API_PATHS } from "./apiPaths";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token"); // Fixed spelling
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
                // Only redirect if the request is NOT for login
                const loginPath = API_PATHS?.AUTH?.LOGIN || "/api/v1/auth/login";
                if (!error.config?.url?.includes(loginPath)) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    if (window.location.pathname !== "/login") {
                        window.location.href = "/login";
                    }
                }
            } else if (error.response.status === 500) {
                console.error("Server Error");
            }
        } else if (error.code === "ECONNABORTED") {
            console.error("Timeout Error");
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;

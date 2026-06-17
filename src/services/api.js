import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { getToken, clearAuth } from "../utils/tokenUtils";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 80000
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        if (
            response.data &&
            response.data.hasOwnProperty("success")
        ) {
            return response.data;   
        }
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;

            // 401 — token expired
            if (status === 401) {
                clearAuth();
                window.location.href = "/login";
            }

            // Extract message from ApiResponse
            const message = error.response.data?.message
                || "Something went wrong";

            return Promise.reject(new Error(message));
        }

        if (error.request) {
            return Promise.reject(
                new Error("Network error. Check your connection")
            );
        }

        return Promise.reject(error);
    }
);

export default api;
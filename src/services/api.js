import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { getToken, clearAuth } from "../utils/tokenUtils";

// AXIOS INSTANCE
 const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000                            // 10 seconds
});

// REQUEST INTERCEPTOR Attach JWT token to every request
api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// RESPONSE INTERCEPTOR Handle errors 
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const status = error.response.status;

            // 401 — token expired or invalid
            if (status === 401) {
                clearAuth();
                window.location.href = "/login";
            }

            // 403 — forbidden
            if (status === 403) {
                console.error("Access forbidden");
            }

            // Extract error message from ApiResponse
            const message = error.response.data?.message
                || "Something went wrong";

            return Promise.reject(new Error(message));
        }

        // Network error
        if (error.request) {
            return Promise.reject(
                new Error("Network error. Check your connection")
            );
        }

        return Promise.reject(error);
    }
);

export default api;
import api from "./api";
import { ENDPOINTS } from "../utils/constants";
import { saveToken, saveUser, clearAuth } from "../utils/tokenUtils";


// REGISTER
export const register = async (data) => {
    try {
        const response = await api.post(
            ENDPOINTS.AUTH.REGISTER, data
        );
        const { token, ...user } = response.data.data;
        saveToken(token);
        saveUser(user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// LOGIN
export const login = async (data) => {
    try {
        const response = await api.post(
            ENDPOINTS.AUTH.LOGIN, data
        );
        const { token, ...user } = response.data.data;
        saveToken(token);
        saveUser(user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// LOGOUT
export const logout = () => {
    clearAuth();
    window.location.href = "/login";
};

// CHANGE PASSWORD
export const changePassword = async (
    userId,
    currentPassword,
    newPassword,
    confirmPassword
) => {
    try {
        const response = await api.put(
            `${ENDPOINTS.AUTH.CHANGE_PASSWORD}/${userId}`,
            null,
            {
                params: {
                    currentPassword,
                    newPassword,
                    confirmPassword
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ADMIN RESET PASSWORD
export const adminResetPassword = async (userId, newPassword) => {
    try {
        const response = await api.put(
            `${ENDPOINTS.AUTH.RESET_PASSWORD}/${userId}`,
            null,
            { params: { newPassword } }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
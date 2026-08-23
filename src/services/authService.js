import api from "./api";
import { ENDPOINTS } from "../utils/constants";
import { saveToken, saveUser, clearAuth } from "../utils/tokenUtils";

export const login = async (data) => {
    try {
        const response = await api.post(
            ENDPOINTS.AUTH.LOGIN, data
        );


        if (!token) {
            throw new Error("Token not received from server");
        }

        const user = { role, userId, fullName, studentId, rollNumber };

        saveToken(token);
        saveUser(user);
        return response;

    } catch (error) {
        throw error;
    }
};

export const register = async (data) => {
    try {
        const response = await api.post(
            ENDPOINTS.AUTH.REGISTER, data
        );

        const token = response?.data?.token;
        const role = response?.data?.role;
        const userId = response?.data?.userId;
        const fullName = response?.data?.fullName;
        const studentId = response?.data?.studentId;
        const rollNumber = response?.data?.rollNumber;

        if (!token) {
            throw new Error("Token not received from server");
        }

        const user = { role, userId, fullName, studentId, rollNumber };

        saveToken(token);
        saveUser(user);
        return response;

    } catch (error) {
        throw error;
    }
};

export const logout = () => {
    clearAuth();
    window.location.href = "/login";
};

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
        return response;
    } catch (error) {
        throw error;
    }
};

export const adminResetPassword = async (userId, newPassword) => {
    try {
        const response = await api.put(
            `${ENDPOINTS.AUTH.RESET_PASSWORD}/${userId}`,
            null,
            { params: { newPassword } }
        );
        return response;
    } catch (error) {
        throw error;
    }

};

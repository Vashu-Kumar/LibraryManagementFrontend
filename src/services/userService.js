import api from "./api";
import { ENDPOINTS } from "../utils/constants";

export const getUserById = (id) =>
    api.get(`${ENDPOINTS.USERS.BASE}/${id}`);

export const getAllStudents = () =>
    api.get(ENDPOINTS.USERS.STUDENTS);

export const getAllLibrarians = () =>
    api.get(ENDPOINTS.USERS.LIBRARIANS);

export const searchUsers = (keyword) =>
    api.get(ENDPOINTS.USERS.SEARCH, { params: { keyword } });

export const createLibrarian = (data) =>
    api.post(ENDPOINTS.USERS.LIBRARIAN, data);

export const updateProfile = (userId, data) =>
    api.put(`${ENDPOINTS.USERS.PROFILE}/${userId}`, data);

export const toggleUserStatus = (userId) =>
    api.put(`${ENDPOINTS.USERS.TOGGLE_STATUS}/${userId}`);

export const updateMembership = (userId, membershipType) =>
    api.put(`${ENDPOINTS.USERS.MEMBERSHIP}/${userId}`, null, {
        params: { membershipType }
    });

export const getBlockedUsers = () =>
    api.get(ENDPOINTS.USERS.BLOCKED);
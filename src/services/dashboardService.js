import api from "./api";
import { ENDPOINTS } from "../utils/constants";

export const getStudentStats = (studentId) =>
    api.get(`${ENDPOINTS.DASHBOARD.STUDENT}/${studentId}`);

export const getAdminStats = () =>
    api.get(ENDPOINTS.DASHBOARD.ADMIN);

export const getLibrarianStats = () =>
    api.get(ENDPOINTS.DASHBOARD.LIBRARIAN);
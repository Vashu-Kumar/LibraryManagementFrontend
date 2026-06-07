import api from "./api";
import { ENDPOINTS } from "../utils/constants";

export const markFinePaid = (data, librarianId) =>
    api.put(ENDPOINTS.FINES.PAY, data, {
        params: { librarianId }
    });

export const getAllFines = () =>
    api.get(ENDPOINTS.FINES.BASE);

export const getFineById = (id) =>
    api.get(`${ENDPOINTS.FINES.BASE}/${id}`);

export const getPendingFines = () =>
    api.get(ENDPOINTS.FINES.PENDING);

export const getFinesByStudent = (studentId) =>
    api.get(`${ENDPOINTS.FINES.STUDENT}/${studentId}`);

export const getPendingFinesByStudent = (studentId) =>
    api.get(`${ENDPOINTS.FINES.STUDENT}/${studentId}/pending`);

export const getFineByLoan = (loanId) =>
    api.get(`${ENDPOINTS.FINES.LOAN}/${loanId}`);
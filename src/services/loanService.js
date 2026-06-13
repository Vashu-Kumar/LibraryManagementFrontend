import api from "./api";
import { ENDPOINTS } from "../utils/constants";

export const issueBook = (data, librarianId) =>
    api.post(ENDPOINTS.LOANS.ISSUE, data, {
        params: { librarianId }
    });

export const returnBook = (id, librarianId, bookCondition, remarks) =>
    api.put(`${ENDPOINTS.LOANS.RETURN}/${id}`, null, {
        params: { librarianId, bookCondition, remarks }
    });

export const renewLoan = (id, studentId) =>
    api.put(`${ENDPOINTS.LOANS.RENEW}/${id}`, null, {
        params: { studentId }
    });

export const getAllLoans = () =>
    api.get(ENDPOINTS.LOANS.BASE);

export const getLoanById = (id) =>
    api.get(`${ENDPOINTS.LOANS.BASE}/${id}`);

export const getLoansByStudent = (studentId) =>
    api.get(`${ENDPOINTS.LOANS.STUDENT}/${studentId}`);

export const getActiveLoansByStudent = (studentId) =>
    api.get(`${ENDPOINTS.LOANS.STUDENT}/${studentId}/active`);

export const getOverdueLoans = () =>
    api.get(ENDPOINTS.LOANS.OVERDUE);

export const getRecentLoans = () =>
    api.get(ENDPOINTS.LOANS.RECENT);

export const markAsLost = (id) =>
    api.put(`${ENDPOINTS.LOANS.LOST}/${id}`);
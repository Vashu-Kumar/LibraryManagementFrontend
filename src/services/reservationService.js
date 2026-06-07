import api from "./api";
import { ENDPOINTS } from "../utils/constants";

export const createReservation = (data, studentId) =>
    api.post(ENDPOINTS.RESERVATIONS.BASE, data, {
        params: { studentId }
    });

export const cancelReservation = (id, cancelledById, reason) =>
    api.put(`${ENDPOINTS.RESERVATIONS.CANCEL}/${id}`, null, {
        params: { cancelledById, reason }
    });

export const markReservationActive = (id) =>
    api.put(`${ENDPOINTS.RESERVATIONS.ACTIVE}/${id}`);

export const getAllReservations = () =>
    api.get(ENDPOINTS.RESERVATIONS.BASE);

export const getReservationById = (id) =>
    api.get(`${ENDPOINTS.RESERVATIONS.BASE}/${id}`);

export const getReservationsByStudent = (studentId) =>
    api.get(`${ENDPOINTS.RESERVATIONS.STUDENT}/${studentId}`);

export const getAllPendingReservations = () =>
    api.get(ENDPOINTS.RESERVATIONS.PENDING);

export const getReservationsByBook = (bookId) =>
    api.get(`${ENDPOINTS.RESERVATIONS.BOOK}/${bookId}`);
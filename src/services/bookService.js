import api from "./api";
import { ENDPOINTS } from "../utils/constants";

export const getAllBooks    = ()         =>
    api.get(ENDPOINTS.BOOKS.BASE);

export const getBookById   = (id)       =>
    api.get(`${ENDPOINTS.BOOKS.BASE}/${id}`);

export const searchBooks   = (keyword)  =>
    api.get(ENDPOINTS.BOOKS.SEARCH, { params: { keyword } });

export const filterBooks   = (categoryId, available) =>
    api.get(ENDPOINTS.BOOKS.FILTER, {
        params: { categoryId, available }
    });

export const addBook = (data, librarianId) =>
    api.post(ENDPOINTS.BOOKS.BASE, data, {
        params: { librarianId }
    });

export const updateBook = (id, data) =>
    api.put(`${ENDPOINTS.BOOKS.BASE}/${id}`, data);

export const deleteBook = (id) =>
    api.delete(`${ENDPOINTS.BOOKS.BASE}/${id}`);

export const addCopies = (id, count) =>
    api.put(`${ENDPOINTS.BOOKS.BASE}/${id}/add-copies`, null, {
        params: { count }
    });

export const markDamaged = (id, description) =>
    api.put(`${ENDPOINTS.BOOKS.BASE}/${id}/mark-damaged`, null, {
        params: { description }
    });

export const getTopBorrowedBooks = () =>
    api.get(ENDPOINTS.BOOKS.TOP_BORROWED);
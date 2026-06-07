import api from "./api";
import { ENDPOINTS } from "../utils/constants";

export const getAllCategories  = ()          =>
    api.get(ENDPOINTS.CATEGORIES.BASE);

export const getCategoryById   = (id)        =>
    api.get(`${ENDPOINTS.CATEGORIES.BASE}/${id}`);

export const addCategory       = (name, description) =>
    api.post(ENDPOINTS.CATEGORIES.BASE, null, {
        params: { name, description }
    });

export const updateCategory    = (id, name, description) =>
    api.put(`${ENDPOINTS.CATEGORIES.BASE}/${id}`, null, {
        params: { name, description }
    });

export const deleteCategory    = (id)        =>
    api.delete(`${ENDPOINTS.CATEGORIES.BASE}/${id}`);
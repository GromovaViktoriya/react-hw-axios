import axiosInstance from "./axiosInstance.js";

export const register = async (values) => {
    try {
        const response = await axiosInstance.post(`/api/auth/register`, values);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const login = async (values) => {
    try {
        const response = await axiosInstance.post(`/api/auth/login`, values);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const authMe = async () => {
    try {
        const response = await axiosInstance.get(`/api/auth/me`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const fetchData = async () => {
    try {
        const response = await axiosInstance.get('/api/todos')
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const deleteItem = async (taskId) => {
    try {
        await axiosInstance.delete(`/api/todos/${taskId}`);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const createItem = async (value) => {
    try {
       const response = await axiosInstance.post(`/api/todos`, value);
       return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const getItemById = async (taskId) => {
    try {
        const response = await axiosInstance.get(`/api/todos/${taskId}`);
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}

export const updateItem = async (taskId, values) => {
    try {
        await axiosInstance.patch(`/api/todos/${taskId}`, values);
    } catch (error) {
        return Promise.reject(error);
    }
}

export const toggleTaskStatus = async (taskId) => {
    try {
       const response = await axiosInstance.patch(`/api/todos/${taskId}/toggle`);
       return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}


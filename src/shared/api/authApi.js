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
import axios from "axios";
import {getCookie} from "../../utils/getCookie.js";

export const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use(config => {
    const token = getCookie("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        document.cookie = "access_token=; Max-Age=0; path=/;"
    }
    return Promise.reject(error);
});

export default axiosInstance;


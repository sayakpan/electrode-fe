import axios from "axios";

let token = '';

if (typeof window !== 'undefined') {
    token = localStorage.getItem('authToken') || '';
}

const headers = {};

if (token) {
    headers['Authorization'] = `Token ${token}`;
}

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: headers,
});

export default axiosInstance;

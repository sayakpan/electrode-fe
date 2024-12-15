import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from localStorage just before sending the request
        const token = localStorage.getItem('token_electrode');
        if (token) {
            config.headers['Authorization'] = `Token ${token}`;
        }
        return config;
    },
    (error) => {
        // Handle errors before the request is sent
        return Promise.reject(error);
    }
);

export default axiosInstance;
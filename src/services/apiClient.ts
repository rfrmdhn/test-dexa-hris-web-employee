import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle common errors here (e.g., 401 Unauthorized)
        if (error.response && error.response.status === 401) {
            // Optional: Dispatch logout action or redirect
            // window.location.href = '/'; 
        }
        return Promise.reject(error);
    }
);

export default apiClient;

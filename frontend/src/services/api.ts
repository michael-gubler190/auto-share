import axios from "axios";


const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

// Handle token expiration globally
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        
        // Don't intercept auth endpoints — let those errors
        // pass through to the component directly
        const isAuthRoute = original.url?.includes("/api/auth/");
        if (isAuthRoute) {
            return Promise.reject(error);
        }


        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            try {
                await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
                    {},
                    { withCredentials: true }
                );
                
                return api(original);
            } catch {
                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;

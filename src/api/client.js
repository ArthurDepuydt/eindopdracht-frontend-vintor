import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "novi-education-project-id": import.meta.env.VITE_API_PROJECT_ID,
  },
});

export function authHeader(token) {
  return { Authorization: `Bearer ${token}` };
}

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      alert("Je sessie is verlopen. Log opnieuw in om verder te gaan.");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

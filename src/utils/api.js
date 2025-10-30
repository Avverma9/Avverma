import axios from 'axios';
import baseURL from './baseURL';

const api = axios.create({
  baseURL,
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    // ✅ Network error ya server error (5xx)
    if (!response || (response?.status >= 500 && response?.status <= 599)) {
      if (window.location.pathname !== '/server-error') {
        window.location.href = '/server-error'; // ✅ Error page par le jayega
      }
    }

    // ✅ Unauthorized (401)
    else if (response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;

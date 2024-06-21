import axios from 'axios';
import { HOST_API_KEY } from '../config-global';
const storedAuth = JSON.parse(localStorage.getItem('auth') as string);

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API_KEY,
  headers: {
    'Content-Type': 'application/json',
    'accept': 'application/json',
    'Authorization': storedAuth?.isAuthenticated ? `Bearer ${storedAuth.user.access}` : "",
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

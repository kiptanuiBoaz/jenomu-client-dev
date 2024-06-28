import axios from 'axios';
import { HOST_API_KEY } from '../config-global';
import Notiflix from 'notiflix';
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

const initialAuthState = {
  user: {},
  isAuthenticated: false,
}

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || 403) {
      localStorage.setItem('auth', JSON.stringify(initialAuthState));
      // Notiflix.Notify.failure("Session expired, please try again")

    }
    Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

export default axiosInstance;

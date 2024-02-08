import Axios from 'axios';
import Cookies from 'js-cookie'; // Importe a biblioteca 'js-cookie'

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:3001', 
  withCredentials: true, // Isso mantém os cookies no Axios
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

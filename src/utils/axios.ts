import axios from 'axios';

const axiosInstance = axios.create({ baseURL: 'https://life-at-kmitl-backend-production.up.railway.app' });

export default axiosInstance;

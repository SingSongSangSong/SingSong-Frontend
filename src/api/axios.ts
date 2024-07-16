import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://www.dungdungcloud.shop:8000',
  baseURL: 'http://10.0.2.2:8000',
  withCredentials: true,
});

export default axiosInstance;

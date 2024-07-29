import axios from 'axios';
import Config from 'react-native-config';
import {ACCESS_TOKEN} from '../constants';
import useTokenStore from '../store/useTokenStore';

const AxiosInstances = () => {
  const {getSecureValue, isValidToken} = useTokenStore();

  isValidToken(); //만료된 토큰인지 검사

  const axiosInstance = axios.create({
    baseURL: Config.HOST,
    withCredentials: true,
  });

  const axiosAuthInstance = axios.create({
    baseURL: Config.HOST,
    headers: {
      Authorization: `Bearer ${getSecureValue(ACCESS_TOKEN)}`,
      'Content-Type': 'application/json',
    },
  });
  return {axiosInstance, axiosAuthInstance};
};

export default AxiosInstances;

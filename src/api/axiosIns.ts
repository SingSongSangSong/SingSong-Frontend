import axios from 'axios';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';

const deviceModel = DeviceInfo.getModel();
const systemVersion = DeviceInfo.getSystemVersion();
const platform = Platform.OS;

const axiosInstance = axios.create({
  baseURL: Config.HOST,
  withCredentials: true,
  headers: {
    'User-Agent': `Singsongsangsong/1.0.0 (${
      platform === 'ios' ? 'iOS' : 'Android'
    }; ${
      platform === 'ios' ? 'iOS' : 'Android'
    } ${systemVersion}; ${deviceModel})`,
  },
});

export default axiosInstance;

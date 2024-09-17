import axios from 'axios';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {getCurrentVersion} from '../utils';

const deviceModel = DeviceInfo.getModel();
const systemVersion = DeviceInfo.getSystemVersion();
const platform = Platform.OS;
const currentVersion = getCurrentVersion();

const axiosInstance = axios.create({
  baseURL: Config.HOST,
  withCredentials: true,
  headers: {
    'User-Agent': `Singsongsangsong/${currentVersion} (${
      platform === 'ios' ? 'iOS' : 'Android'
    }; ${
      platform === 'ios' ? 'iOS' : 'Android'
    } ${systemVersion}; ${deviceModel})`,
  },
});

export default axiosInstance;

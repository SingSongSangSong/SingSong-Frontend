import axios from 'axios';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import {Platform} from 'react-native';
import {getCurrentVersion, showToast} from '../utils';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  API_COMMENT,
  API_KEEP,
  API_MEMBER,
  API_SEARCH,
  API_SONG,
} from '../constants/api';
import {postMemberReissue} from './member-api';
import {navigateToLogin} from '../navigations/rootNavigation';

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

const noAuthRequiredEndpoints: string[] = [
  API_MEMBER.LOGIN,
  API_MEMBER.REISSUE,
  API_COMMENT.COMMENT_RECENT,
  API_KEEP.KEEP_RECENT,
  API_SEARCH.SEARCH_RECENT,
  API_SONG.SONG_RECOMMEND_HOME,
  API_SONG.SONG_REVIEW_OPTIONS,
  API_SONG.SONG_TAG,
];

axiosInstance.interceptors.request.use(
  config => {
    const token = AsyncStorage.getItem(ACCESS_TOKEN);
    if (token && !noAuthRequiredEndpoints.includes(config.url as string)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const reissueData = await postMemberReissue();
        if (reissueData.data.accessToken) {
          AsyncStorage.setItem(ACCESS_TOKEN, reissueData.data.accessToken);
          AsyncStorage.setItem(REFRESH_TOKEN, reissueData.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${reissueData.data.accessToken}`;
          return axios(originalRequest);
        }
      } catch {
        showToast('접속 권한이 만료되었습니다. 다시 로그인 해주세요.');
        navigateToLogin();
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

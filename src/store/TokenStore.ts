import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';
import {navigateToLogin} from '../navigations/rootNavigation';
import {showToast} from '../utils';
import {postMemberReissue} from '../api/member-api';
// import useMemberStore from './useMemberStore';
// import useKeepV2Store from './useKeepV2Store';

const TokenStore = () => {
  // const clearMemberInfo = useMemberStore(state => state.clearMemberInfo);
  // const clearProvider = useMemberStore(state => state.clearProvider);
  // const resetKeepList = useKeepV2Store(state => state.resetKeepList);
  // get
  async function getSecureValue(key: string): Promise<string> {
    const result = await AsyncStorage.getItem(key);
    return result || '';
  }

  // set
  function setSecureValue(key: string, value: string) {
    AsyncStorage.setItem(key, value);
  }

  // remove
  function removeSecureValue(key: string) {
    AsyncStorage.removeItem(key);
  }

  // const isExpiredToken = (token: string) => {
  //   try {
  //     const decoded = jwtDecode<{exp: number}>(token);
  //     const currentTime = Date.now() / 1000;
  //     return decoded.exp < currentTime;
  //   } catch (error) {
  //     console.error('Invalid token:', error);
  //     return true;
  //   }
  // };
  const isExpiredToken = (token: string) => {
    try {
      // console.log('Token received for decoding:', token); // 토큰이 올바른지 출력
      // if (token.split('.').length !== 3) {
      //   throw new Error('Invalid token format');
      // }

      const decoded = jwtDecode<{exp: number}>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return true;
    }
  };

  const getAccessToken = async () => {
    const accessToken = await getSecureValue(ACCESS_TOKEN);
    const refreshToken = await getSecureValue(REFRESH_TOKEN);

    if (isExpiredToken(refreshToken)) {
      removeSecureValue(ACCESS_TOKEN);
      removeSecureValue(REFRESH_TOKEN);
      navigateToLogin(); // 토큰 재발급 실패 시 로그인 화면으로 이동
      throw new Error('Refresh token is expired'); // 에러를 상위로 다시 던져서 호출한 쪽에서 추가 처리할 수 있도록
    }

    // accessToken이 만료된 경우
    if (isExpiredToken(accessToken)) {
      try {
        const reissueData = await postMemberReissue();
        setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
        setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
        return reissueData.data.accessToken;
      } catch (error) {
        console.error('Token reissue failed:', error);
        // clearMemberInfo();
        // clearProvider();
        // resetKeepList();
        showToast('토큰이 만료되었습니다. 다시 로그인 해주세요.');
        navigateToLogin(); // 토큰 재발급 실패 시 로그인 화면으로 이동
        throw error; // 에러를 상위로 다시 던져서 호출한 쪽에서 추가 처리할 수 있도록
      }
    }

    return accessToken;
  };

  const getIsValidToken = async (): Promise<boolean> => {
    const accessToken = await getSecureValue(ACCESS_TOKEN);
    const refreshToken = await getSecureValue(REFRESH_TOKEN);

    // 토큰이 없는지 검사
    if (!accessToken || !refreshToken) {
      return false; // 로그인 화면으로 이동
    }

    // refreshToken이 만료된 경우
    if (isExpiredToken(refreshToken)) {
      removeSecureValue(ACCESS_TOKEN);
      removeSecureValue(REFRESH_TOKEN);
      return false; // 로그인 화면으로 이동
    }

    // accessToken이 만료된 경우
    if (isExpiredToken(accessToken)) {
      try {
        const reissueData = await postMemberReissue();
        setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
        setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
        return true;
      } catch (error) {
        console.error('Error in postMemberReissue:', error);
        // 에러 발생 시 토큰 제거
        removeSecureValue(ACCESS_TOKEN);
        removeSecureValue(REFRESH_TOKEN);
        return false;
      }
      // const reissueData = await postMemberReissue(accessToken, refreshToken);
      // setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
      // setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
      // return true;
    }

    return true;
  };

  return {
    getSecureValue,
    setSecureValue,
    removeSecureValue,
    isExpiredToken,
    getAccessToken,
    getIsValidToken,
  };
};

export default TokenStore;

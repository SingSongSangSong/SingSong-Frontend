// import {jwtDecode} from 'jwt-decode';
// import * as Keychain from 'react-native-keychain';
// import postMemberReissue from '../api/member/postmemberReissue';
// import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';

// const TokenStore = () => {
//   // get
//   async function getSecureValue(key: string): Promise<string> {
//     const result = await Keychain.getInternetCredentials(key);
//     if (result) {
//       return result.password;
//     }
//     return '';
//   }

//   // set
//   function setSecureValue(key: string, value: string) {
//     Keychain.setInternetCredentials(key, key, value);
//   }

//   // remove
//   function removeSecureValue(key: string) {
//     Keychain.resetInternetCredentials(key);
//   }

//   const isExpiredToken = (token: string) => {
//     try {
//       const decoded = jwtDecode<{exp: number}>(token);
//       const currentTime = Date.now() / 1000;
//       // console.log(':', decoded);
//       // console.log('current Time:', currentTime);
//       return decoded.exp < currentTime;
//     } catch (error) {
//       console.error('Invalid token:', error);
//       return true;
//     }
//   };

//   // const isValidAccessToken = async () => {
//   //   const accessToken = await getSecureValue(ACCESS_TOKEN);
//   //   const refreshToken = await getSecureValue(REFRESH_TOKEN);
//   //   if (accessToken && isExpiredToken(accessToken)) {
//   //     console.log('Token expired');
//   //     const reissueData = await postMemberReissue(accessToken, refreshToken);
//   //     setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
//   //     setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
//   //   }
//   // };

//   // const isValidRefreshToken = async () => {
//   //   const refreshToken = await getSecureValue(REFRESH_TOKEN);
//   //   return refreshToken && isExpiredToken(refreshToken);
//   // };

//   const getAccessToken = async () => {
//     const accessToken = await getSecureValue(ACCESS_TOKEN);
//     const refreshToken = await getSecureValue(REFRESH_TOKEN);
//     // console.log(accessToken, refreshToken);
//     //accessToken이 만료된 경우
//     if (isExpiredToken(accessToken)) {
//       const reissueData = await postMemberReissue(accessToken, refreshToken);
//       setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
//       setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
//       return reissueData.data.accessToken;
//     }

//     return accessToken;
//   };

//   const getIsValidToken = async (): Promise<boolean> => {
//     const accessToken = await getSecureValue(ACCESS_TOKEN);
//     const refreshToken = await getSecureValue(REFRESH_TOKEN);
//     console.log(accessToken, refreshToken);

//     //토큰이 없는지 검사
//     if (!accessToken || !refreshToken) {
//       return false; //로그인 화면
//     }

//     //리프레시 토큰이 만료된 경우
//     if (isExpiredToken(refreshToken)) {
//       removeSecureValue(ACCESS_TOKEN);
//       removeSecureValue(REFRESH_TOKEN);
//       return false; //로그인 화면
//     }

//     //액세스 토큰이 만료된 경우
//     if (isExpiredToken(accessToken)) {
//       // console.log(accessToken);
//       // console.log(refreshToken);
//       const reissueData = await postMemberReissue(accessToken, refreshToken);
//       setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);

//       setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
//       return true;
//     }

//     return true;
//   };

//   return {
//     getSecureValue,
//     setSecureValue,
//     removeSecureValue,
//     isExpiredToken,
//     getAccessToken,
//     getIsValidToken,
//   };
// };

// export default TokenStore;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import postMemberReissue from '../api/member/postmemberReissue';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';

const TokenStore = () => {
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

  const isExpiredToken = (token: string) => {
    try {
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

    // accessToken이 만료된 경우
    if (isExpiredToken(accessToken)) {
      const reissueData = await postMemberReissue(accessToken, refreshToken);
      setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
      setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
      return reissueData.data.accessToken;
    }

    return accessToken;
  };

  const getIsValidToken = async (): Promise<boolean> => {
    const accessToken = await getSecureValue(ACCESS_TOKEN);
    const refreshToken = await getSecureValue(REFRESH_TOKEN);
    // console.log(accessToken, refreshToken);

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
      const reissueData = await postMemberReissue(accessToken, refreshToken);
      setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
      setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
      return true;
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

import {jwtDecode} from 'jwt-decode';
import * as Keychain from 'react-native-keychain';
import postUserReissue from '../api/user/postUserReissue';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';

const TokenStore = () => {
  // get
  async function getSecureValue(key: string): Promise<string> {
    const result = await Keychain.getInternetCredentials(key);
    if (result) {
      return result.password;
    }
    return '';
  }

  // set
  function setSecureValue(key: string, value: string) {
    Keychain.setInternetCredentials(key, key, value);
  }

  // remove
  function removeSecureValue(key: string) {
    Keychain.resetInternetCredentials(key);
  }

  const isExpiredToken = (accessToken: string) => {
    try {
      const decoded = jwtDecode<{exp: number}>(accessToken);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      console.error('Invalid token:', error);
      return true;
    }
  };

  const isValidToken = async () => {
    const accessToken = await getSecureValue(ACCESS_TOKEN);
    const refreshToken = await getSecureValue(REFRESH_TOKEN);
    if (accessToken && isExpiredToken(accessToken)) {
      console.log('Token expired');
      const reissueData = await postUserReissue(accessToken, refreshToken);
      setSecureValue(ACCESS_TOKEN, reissueData.data.accessToken);
      setSecureValue(REFRESH_TOKEN, reissueData.data.refreshToken);
    }
  };

  const getAccessToken = async () => {
    isValidToken(); //만료된 토큰인지 검사
    const accessToken = await getSecureValue(ACCESS_TOKEN);

    return accessToken;
  };

  return {
    getSecureValue,
    setSecureValue,
    removeSecureValue,
    isExpiredToken,
    isValidToken,
    getAccessToken,
  };
};

export default TokenStore;

import {useState} from 'react';
import TokenStore from '../store/TokenStore';
import {getCurrentVersion} from '../utils';
import remoteConfig from '@react-native-firebase/remote-config';
import {BackHandler, Linking, Platform} from 'react-native';
import VersionStore from '../store/VersionStore';

const useInit = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isCheckModalVisible, setIsCheckModalVisible] =
    useState<boolean>(false);
  const [isForced, setIsForced] = useState<boolean>(false);
  const [updateUrl, setUpdateUrl] = useState<string>('');
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const setCurrentVersion = VersionStore(state => state.setCurrentVersion);
  const [isStopCheck, setIsStopCheck] = useState<boolean>(false);
  const [stopDuration, setStopDuration] = useState<string>('');

  const forceUpdateMessage = {
    title: '업데이트 필요',
    message: '앱의 최신 버전으로 업데이트가 필요합니다.',
    buttonPositive: '업데이트',
    buttonNegative: '종료',
  };
  const optionalUpdateMessage = {
    title: '업데이트 알림',
    message: '새로운 기능이 추가된 버전이 있습니다. \n업데이트하시겠습니까?',
    buttonPositive: '업데이트',
    buttonNegative: '나중에',
  };

  const {getIsValidToken} = TokenStore();

  const setRemoteConfig = async () => {
    await remoteConfig().setDefaults({
      latestVersion: '1.0.0',
      forceUpdateVersion: '1.0.0',
      latestVersionForIOS: '1.0.0',
      forceUpdateVersionForIOS: '1.0.0',
      stopCheck: '0',
      stopCheckForAndroid: '0',
      stopDuration: '~12.28(토)',
      updateUrl:
        'https://play.google.com/store/apps/details?id=com.example.app',
      updateUrlForIOS: 'https://apps.apple.com/kr/app/id1234567890',
    });

    // Remote Config 설정
    await remoteConfig().setConfigSettings({
      // minimumFetchIntervalMillis: 86400000, // 1시간
      // fetchTimeMillis: 3000,
      minimumFetchIntervalMillis: 0,
    });
  };

  const versionCheck = async () => {
    try {
      // console.log('Remote Config 설정 시작');
      await setRemoteConfig();
      // console.log('Remote Config 설정 완료');

      // fetchAndActivate에 2초 타임아웃 적용
      const activated = await Promise.race([
        remoteConfig().fetchAndActivate(),
        new Promise(resolve => setTimeout(() => resolve(true), 1500)), // 2초 후에 true 반환
      ]);

      // console.log('Remote Config 업데이트 완료:', activated);

      // 로컬에서 현재 버전 정보 가져오기
      const currentVersion = await getCurrentVersion();
      setCurrentVersion(currentVersion);
      // console.log('현재 버전:', currentVersion);

      let latestVersion;
      let forceUpdateVersion;
      let updateUrl;

      if (Platform.OS === 'ios') {
        latestVersion = remoteConfig().getString('latestVersionForIOS');
        forceUpdateVersion = remoteConfig().getString(
          'forceUpdateVersionForIOS',
        );
        updateUrl = remoteConfig().getString('updateUrlForIOS');
      } else {
        latestVersion = remoteConfig().getString('latestVersion');
        forceUpdateVersion = remoteConfig().getString('forceUpdateVersion');
        updateUrl = remoteConfig().getString('updateUrl');
      }

      console.log('최신 버전:', latestVersion);
      console.log('강제 업데이트 버전:', forceUpdateVersion);
      console.log('업데이트 URL:', updateUrl);

      if (!latestVersion || !forceUpdateVersion || !updateUrl) {
        throw new Error('Remote Config에서 필요한 값이 없습니다');
      }

      setUpdateUrl(updateUrl!);

      // 강제 업데이트 체크
      if (currentVersion < forceUpdateVersion) {
        setIsForced(true);
        setIsModalVisible(true);
        return false;
      } else if (currentVersion < latestVersion) {
        setIsModalVisible(true);
        return false;
      }

      return true;
    } catch (error) {
      console.error('버전 체크 중 오류가 발생했습니다:', error);
      return true;
    }
  };

  const stopCheck = async () => {
    try {
      let isCheck;
      let tempStopDuration;
      await Promise.race([
        remoteConfig().fetchAndActivate(),
        new Promise(resolve => setTimeout(() => resolve(true), 1500)), // 2초 후에 true 반환
      ]);

      if (Platform.OS == 'ios') {
        isCheck = remoteConfig().getString('stopCheck');
      } else {
        isCheck = remoteConfig().getString('stopCheckForAndroid');
      }

      tempStopDuration = remoteConfig().getString('stopDuration');

      setStopDuration(tempStopDuration);

      if (isCheck == '1') {
        setIsStopCheck(true);
        return true;
      } else {
        setIsStopCheck(false);
        return false;
      }
    } catch (error) {
      console.error('stop 체크 중 오류가 발생했습니다:', error);
      return true;
    }
  };

  const handleOnConfirmButton = () => {
    Linking.openURL(updateUrl);
  };

  const handleOnCancelButton = () => {
    if (isForced || isStopCheck) {
      BackHandler.exitApp();
      return;
    }
    setShouldStartAnimation(true);
    setIsModalVisible(false);
  };

  return {
    getIsValidToken,
    versionCheck,
    stopCheck,
    forceUpdateMessage,
    optionalUpdateMessage,
    isForced,
    handleOnConfirmButton,
    handleOnCancelButton,
    shouldStartAnimation,
    setShouldStartAnimation,
    isModalVisible,
    setIsModalVisible,
    isCheckModalVisible,
    setIsCheckModalVisible,
    stopDuration,
  };
};

export default useInit;

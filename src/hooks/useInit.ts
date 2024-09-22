import {useState} from 'react';
import TokenStore from '../store/TokenStore';
import {getCurrentVersion} from '../utils';
import remoteConfig from '@react-native-firebase/remote-config';
import {BackHandler, Linking, Platform} from 'react-native';
import VersionStore from '../store/VersionStore';

const useInit = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isForced, setIsForced] = useState<boolean>(false);
  const [updateUrl, setUpdateUrl] = useState<string>('');
  const [shouldStartAnimation, setShouldStartAnimation] = useState(false);
  const setCurrentVersion = VersionStore(state => state.setCurrentVersion);

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
      updateUrl:
        'https://play.google.com/store/apps/details?id=com.example.app',
      updateUrlForIOS: 'https://apps.apple.com/kr/app/id1234567890',
    });

    // Remote Config 설정
    await remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 0, // 1시간
    });
  };

  const versionCheck = async () => {
    try {
      await setRemoteConfig();

      const fetchedRemotely = await remoteConfig().fetchAndActivate();

      // 로컬에서 현재 버전 정보 가져오기
      const currentVersion = await getCurrentVersion();
      setCurrentVersion(currentVersion);

      let latestVersion;
      let forceUpdateVersion;
      let updateUrl;

      // Remote Config에서 최신 버전 정보 가져오기
      // const latestVersion = remoteConfig().getString('latestVersion');
      // const forceUpdateVersion = remoteConfig().getString('forceUpdateVersion');
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

      setUpdateUrl(updateUrl!);

      // console.log('현재 버전:', currentVersion);
      // console.log('최신 버전:', latestVersion);
      // console.log('강제 업데이트 버전:', forceUpdateVersion);

      // 강제 업데이트가 필요할 경우
      if (currentVersion < forceUpdateVersion) {
        // console.log('강제 업데이트가 필요합니다.');
        setIsForced(true);
        setIsModalVisible(true);

        return false; // 강제 업데이트가 필요하므로 false 반환
      } else if (currentVersion < latestVersion) {
        // console.log('선택적 업데이트를 권장합니다.');
        setIsModalVisible(true);
        return false; // 선택적 업데이트일 경우 true 반환
      }

      return true; // 업데이트가 필요하지 않으면 true 반환
    } catch (error) {
      console.error('버전 체크 중 오류가 발생했습니다:', error);
      return true; // 오류 발생 시에도 앱을 계속 진행할 수 있도록 true 반환
    }
  };

  const handleOnConfirmButton = () => {
    Linking.openURL(updateUrl);
  };

  const handleOnCancelButton = () => {
    if (isForced) {
      BackHandler.exitApp();
      return;
    }
    setShouldStartAnimation(true);
    setIsModalVisible(false);
  };

  return {
    getIsValidToken,
    versionCheck,
    forceUpdateMessage,
    optionalUpdateMessage,
    isForced,
    handleOnConfirmButton,
    handleOnCancelButton,
    shouldStartAnimation,
    setShouldStartAnimation,
    isModalVisible,
    setIsModalVisible,
  };
};

export default useInit;

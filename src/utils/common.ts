import DeviceInfo from 'react-native-device-info';

const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Reflect.ownKeys(obj).length === 0;
};

const getCurrentVersion = async () => {
  const version = DeviceInfo.getVersion();
  console.log('현재 앱 버전:', version);
  return version;
};

export {isEmptyObject, getCurrentVersion};

import DeviceInfo from 'react-native-device-info';

const isEmptyObject = (obj: Record<string, any>): boolean => {
  return Reflect.ownKeys(obj).length === 0;
};

const getCurrentVersion = async () => {
  const version = DeviceInfo.getVersion();
  // console.log('현재 앱 버전:', version);
  return version;
};

const getRandomKeywords = (list: string[], count: number) => {
  const shuffled = [...list].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export {isEmptyObject, getCurrentVersion, getRandomKeywords};

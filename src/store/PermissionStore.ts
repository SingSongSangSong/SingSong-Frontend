import AsyncStorage from '@react-native-async-storage/async-storage';

const PermissionStore = () => {
  const setPermissionValue = async (status: string) => {
    try {
      await AsyncStorage.setItem('@user_consent', status);
    } catch (e) {
      console.error('Failed to save consent status', e);
    }
  };

  const getPermissionValue = async () => {
    try {
      const status = await AsyncStorage.getItem('@user_consent');
      return status;
    } catch (e) {
      console.error('Failed to fetch consent status', e);
      return null;
    }
  };

  const deletePermissionValue = async () => {
    try {
      await AsyncStorage.removeItem('@user_consent');
      // console.log('Consent status deleted');
    } catch (e) {
      console.error('Failed to delete consent status', e);
    }
  };

  return {
    setPermissionValue,
    getPermissionValue,
    deletePermissionValue,
  };
};

export default PermissionStore;

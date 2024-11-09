import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationStore = () => {
  const setNotificationStatus = async (notificationStatus: string) => {
    try {
      await AsyncStorage.setItem('@notification_status', notificationStatus);
    } catch (e) {
      console.error('Failed to save notification status', e);
    }
  };

  const getNotificationStatus = async () => {
    try {
      const notificationStatus = await AsyncStorage.getItem(
        '@notification_status',
      );
      return notificationStatus;
    } catch (e) {
      console.error('Failed to fetch notification status', e);
      return null;
    }
  };

  const deleteNotificationStatus = async () => {
    try {
      await AsyncStorage.removeItem('@notification_status');
    } catch (e) {
      console.error('Failed to delete notification status', e);
    }
  };

  return {
    setNotificationStatus,
    getNotificationStatus,
    deleteNotificationStatus,
  };
};

export default NotificationStore;

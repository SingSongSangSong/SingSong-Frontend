import AsyncStorage from '@react-native-async-storage/async-storage';

const TrackingStore = () => {
  const setTrackingStatus = async (trackingStatus: string) => {
    try {
      await AsyncStorage.setItem('@tracking_status', trackingStatus);
    } catch (e) {
      console.error('Failed to save tracking status', e);
    }
  };

  const getTrackingStatus = async () => {
    try {
      const trackingStatus = await AsyncStorage.getItem('@tracking_status');
      // console.log('Tracking status:', trackingStatus);
      return trackingStatus;
    } catch (e) {
      console.error('Failed to fetch tracking status', e);
      return null;
    }
  };

  const deleteTrackingStatus = async () => {
    try {
      await AsyncStorage.removeItem('@tracking_status');
      // console.log('Tracking status deleted');
    } catch (e) {
      console.error('Failed to delete tracking status', e);
    }
  };

  return {
    setTrackingStatus,
    getTrackingStatus,
    deleteTrackingStatus,
  };
};

export default TrackingStore;

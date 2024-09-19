import AsyncStorage from '@react-native-async-storage/async-storage';

const GuestStore = () => {
  const setGuestState = async (isGuest: boolean) => {
    try {
      await AsyncStorage.setItem('isGuest', JSON.stringify(isGuest));
    } catch (error) {
      console.error('Error saving guest state:', error);
    }
  };

  // Function to get guest state
  const getGuestState = async () => {
    try {
      const value = await AsyncStorage.getItem('isGuest');
      if (value !== null) {
        return JSON.parse(value);
      }
      return false; // Default value if not set
    } catch (error) {
      console.error('Error retrieving guest state:', error);
      return false; // Default value on error
    }
  };

  return {
    setGuestState,
    getGuestState,
  };
};

export default GuestStore;

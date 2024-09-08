import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {MemberInfo} from '../types';

interface MemberState {
  memberInfo: MemberInfo;
  setMemberInfo: (memberInfo: MemberInfo) => void;
  clearMemberInfo: () => void;
  provider: string;
  setProvider: (provider: string) => void;
  clearProvider: () => void;
}

const useMemberStore = create<MemberState>(set => {
  const initState = {
    memberInfo: {} as MemberInfo,
    provider: '',
  };

  const saveToAsyncStorage = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to AsyncStorage', error);
    }
  };

  const loadFromAsyncStorage = async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Failed to load from AsyncStorage', error);
    }
  };

  const loadFromStorage = async () => {
    const storedMemberInfo = await loadFromAsyncStorage('memberInfo');
    const storedProvider = await loadFromAsyncStorage('provider');

    if (storedMemberInfo) {
      set({memberInfo: storedMemberInfo});
    }

    if (storedProvider) {
      set({provider: storedProvider});
    }
  };

  // AsyncStorage에서 자동으로 데이터를 로드
  loadFromStorage();

  return {
    ...initState,

    setMemberInfo: (memberInfo: MemberInfo) => {
      set(() => ({
        memberInfo,
      }));
      saveToAsyncStorage('memberInfo', memberInfo);
    },

    clearMemberInfo: () => {
      set(() => ({
        memberInfo: {} as MemberInfo,
      }));
      AsyncStorage.removeItem('memberInfo');
    },

    setProvider: (provider: string) => {
      set(() => ({
        provider,
      }));
      saveToAsyncStorage('provider', provider);
    },

    clearProvider: () => {
      set(() => ({
        provider: '',
      }));
      AsyncStorage.removeItem('provider');
    },
  };
});

export default useMemberStore;

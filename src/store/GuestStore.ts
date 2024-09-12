import {create} from 'zustand';

interface GuestState {
  isGuest: boolean;
  setIsGuest: (isGuest: boolean) => void;
}

const GuestStore = create<GuestState>(set => {
  const initState = {
    isGuest: false,
  };

  return {
    ...initState,

    setIsGuest: (isGuest: boolean) => {
      set(() => ({
        isGuest: isGuest,
      }));
    },
  };
});

export default GuestStore;

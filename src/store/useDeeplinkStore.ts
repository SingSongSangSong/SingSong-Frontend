import {create} from 'zustand';

interface useDeeplinkState {
  deeplink: string;
  setDeeplink: (deeplink: string) => void;
  isDeepLinkReceived: boolean;
  setIsDeepLinkReceived: (isDeepLinkReceived: boolean) => void;
}

const useDeeplinkStore = create<useDeeplinkState>(set => {
  const initState = {
    deeplink: '',
    isDeepLinkReceived: false,
  };

  return {
    ...initState,

    setDeeplink: (deeplink: string) => {
      set(() => ({
        deeplink: deeplink,
      }));
    },
    setIsDeepLinkReceived: (isDeepLinkReceived: boolean) => {
      set(() => ({
        isDeepLinkReceived: isDeepLinkReceived,
      }));
    },
  };
});

export default useDeeplinkStore;

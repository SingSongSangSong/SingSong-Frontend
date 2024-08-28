import {create} from 'zustand';

interface VersionState {
  currentVersion: string;
  setCurrentVersion: (currentVersion: string) => void;
}

const VersionStore = create<VersionState>(set => {
  const initState = {
    currentVersion: '',
  };

  return {
    ...initState,

    setCurrentVersion: (currentVersion: string) => {
      set(() => ({
        currentVersion: currentVersion,
      }));
    },
  };
});

export default VersionStore;

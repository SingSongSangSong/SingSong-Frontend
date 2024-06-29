import {create} from 'zustand';

interface PropertyState {
  energy: number | 5;
  setEnergy: (energy: number) => void;
  electronic: number | 5;
  setElectronic: (electronic: number) => void;
  brightness: number | 5;
  setBrightness: (brightness: number) => void;
  speed: number | 5;
  setSpeed: (speed: number) => void;
  danceability: number | 5;
  setDanceability: (danceability: number) => void;
  reset: () => void;
}

const usePropertyStore = create<PropertyState>(set => {
  const defaultState = {
    energy: 5,
    electronic: 5,
    brightness: 5,
    speed: 5,
    danceability: 5,
  };

  return {
    ...defaultState,
    setEnergy: (energy: number) => {
      set(state => ({...state, energy}));
    },
    setElectronic: (electronic: number) => {
      set(state => ({...state, electronic}));
    },
    setBrightness: (brightness: number) => {
      set(state => ({...state, brightness}));
    },
    setSpeed: (speed: number) => {
      set(state => ({...state, speed}));
    },
    setDanceability: (danceability: number) => {
      set(state => ({...state, danceability}));
    },
    reset: () => set(defaultState),
  };
});

export default usePropertyStore;

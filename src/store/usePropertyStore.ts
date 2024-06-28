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
}

const usePropertyStore = create<PropertyState>(set => ({
  energy: 5,
  setEnergy: (energy: number) => {
    set(state => ({...state, energy}));
  },
  electronic: 5,
  setElectronic: (electronic: number) => {
    set(state => ({...state, electronic}));
  },
  brightness: 5,
  setBrightness: (brightness: number) => {
    set(state => ({...state, brightness}));
  },
  speed: 5,
  setSpeed: (speed: number) => {
    set(state => ({...state, speed}));
  },
  danceability: 5,
  setDanceability: (danceability: number) => {
    set(state => ({...state, danceability}));
  },
}));

export default usePropertyStore;

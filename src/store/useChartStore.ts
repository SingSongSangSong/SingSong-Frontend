import {create} from 'zustand';
import {Chart} from '../types';

interface ChartState {
  charts: {[gender: string]: Chart[]};
  setCharts: (gender: string, charts: Chart[], itemsPerPage: number) => void;
  selectedCharts: Chart[];
  setSelectedCharts: (selectedCharts: Chart[]) => void;
  userGender: string;
  setUserGender: (userGender: string) => void;
  selectedGender: string;
  setSelectedGender: (selectedGender: string) => void;
  time: string;
  setTime: (time: string) => void;
  isEmptyChart: () => boolean;
}

const useChartStore = create<ChartState>((set, get) => ({
  charts: {},
  selectedCharts: [],
  userGender: '',
  selectedGender: '',
  time: '',

  setCharts: (gender: string, charts: Chart[] | null, itemsPerPage: number) => {
    // charts가 null일 경우 빈 배열로 초기화
    const filledCharts = [...(charts ?? [])];

    // itemsPerPage의 배수로 맞추기 위해 빈 데이터를 채워넣음
    while (filledCharts.length % itemsPerPage !== 0) {
      filledCharts.push({
        songId: 0,
        songName: '',
        artistName: '',
        isMr: 0,
        rankingChange: 0,
        new: '',
      } as Chart);
    }

    // 상태 업데이트
    set(state => ({
      charts: {
        ...state.charts,
        [gender]: filledCharts,
      },
    }));
  },

  setSelectedCharts: (selectedCharts: Chart[]) => {
    set(state => {
      if (selectedCharts !== state.selectedCharts) {
        return {selectedCharts};
      }
      return state;
    });
  },

  setUserGender: (userGender: string) => {
    const state = get();
    if (userGender !== state.userGender) {
      const chartsForSelectedGender = state.charts[userGender] || [];
      set({
        userGender,
        selectedGender: userGender,
        selectedCharts: chartsForSelectedGender,
      });
    }
  },

  setSelectedGender: (selectedGender: string) => {
    const state = get();
    if (selectedGender !== state.selectedGender) {
      const chartsForSelectedGender = state.charts[selectedGender] || [];
      set({
        selectedGender,
        selectedCharts: chartsForSelectedGender,
      });
    }
  },

  setTime: (time: string) => {
    set(state => {
      if (time !== state.time) {
        return {time};
      }
      return state;
    });
  },

  isEmptyChart: () => {
    const state = get();
    if (Object.keys(state.charts).length === 0) {
      return true;
    }
    return Object.values(state.charts).some(
      chartArray => chartArray.length === 0,
    );
  },
}));

export default useChartStore;

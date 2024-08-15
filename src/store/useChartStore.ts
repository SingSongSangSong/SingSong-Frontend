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
  isEmptyChart: () => boolean; // 빈 리스트 확인 함수 (gender 매개변수 없음)
}

const useChartStore = create<ChartState>((set, get) => {
  const initState = {
    charts: {},
    selectedCharts: [],
    userGender: '',
    selectedGender: '',
    time: '',
  };

  return {
    ...initState,

    setCharts: (gender: string, charts: Chart[], itemsPerPage: number) => {
      // 필요한 만큼 빈 객체를 추가하여 itemsPerPage로 나누어떨어지게 함
      const filledCharts = [...charts];
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

      set(state => ({
        charts: {
          ...state.charts,
          [gender]: filledCharts,
        },
      }));
    },

    setSelectedCharts: (selectedCharts: Chart[]) => {
      //선택된 차트 설정
      //선택된 차트 데이터 저장
      set(() => ({
        selectedCharts: selectedCharts,
      }));
    },

    setUserGender: (userGender: string) => {
      //사용자 성별 설정
      set(() => ({
        userGender: userGender,
      }));
      set(() => ({
        selectedGender: userGender,
      }));

      const state = get();
      const chartsForSelectedGender = state.charts[userGender] || []; //사용자 성별에 따라 차트 데이터 설정
      state.setSelectedCharts(chartsForSelectedGender);
    },

    setSelectedGender: (selectedGender: string) => {
      //선택된 성별 설정
      set(() => ({
        selectedGender: selectedGender,
      }));
      // get current state and update selectedCharts based on selectedGender
      const state = get();
      const chartsForSelectedGender = state.charts[selectedGender] || []; //선택된 성별로 차트 데이터 설정
      state.setSelectedCharts(chartsForSelectedGender);
    },

    setTime: (time: string) => {
      //시간 설정
      set(() => ({
        time: time,
      }));
    },

    isEmptyChart: () => {
      const state = get();

      // charts 객체가 비어있으면 true 반환
      if (Object.keys(state.charts).length === 0) {
        return true;
      }

      // charts 객체에 빈 배열이 있는지 확인
      return Object.values(state.charts).some(
        chartArray => chartArray.length === 0,
      );
    },
  };
});

export default useChartStore;

import {create} from 'zustand';
import {ChartSong, ChartV2} from '../types';

interface ChartV2State {
  charts: {[gender: string]: {[ageGroup: string]: ChartSong[]}}; // 성별과 나이 기준으로 차트를 저장
  setCharts: (
    gender: string,
    ageGroup: string,
    charts: ChartSong[] | null,
    itemsPerPage: number,
  ) => void;

  genders: string[];
  ageGroups: string[];

  selectedCharts: ChartSong[];
  setSelectedCharts: (gender: string, ageGroup: string) => void;

  userGender: string;
  setUserGender: (userGender: string) => void;

  userAgeGroup: string;
  setUserAgeGroup: (userAgeGroup: string) => void;

  selectedGender: string;
  setSelectedGender: (selectedGender: string) => void;

  selectedAgeGroup: string;
  setSelectedAgeGroup: (selectedAgeGroup: string) => void;

  time: string;
  setTime: (time: string) => void;

  isEmptyChart: () => boolean;
  setInitChart: (charts: ChartV2[], itemsPerPage: number) => void;
}

const useChartV2Store = create<ChartV2State>((set, get) => ({
  charts: {}, // 초기 차트 데이터

  selectedCharts: [],
  userGender: '',
  userAgeGroup: '',
  selectedGender: '',
  selectedAgeGroup: '',
  time: '',
  genders: [],
  ageGroups: [],

  setCharts: (
    gender: string,
    ageGroup: string,
    charts: ChartSong[] | null,
    itemsPerPage: number,
  ) => {
    // charts가 null일 경우 빈 배열로 초기화
    const filledCharts = [...(charts ?? [])];

    // itemsPerPage의 배수로 맞추기 위해 빈 데이터를 추가
    while (filledCharts.length % itemsPerPage !== 0) {
      filledCharts.push({
        songId: 0,
        songName: '',
        artistName: '',
        isMr: false,
        rankingChange: 0,
        new: '',
        ranking: 2,
        totalScore: 2,
        isNew: false,
        isLive: false,
        songNumber: 0,
        album: '',
      } as ChartSong);
    }

    // 상태 업데이트 (성별과 연령대 기준으로)
    set(state => ({
      charts: {
        ...state.charts,
        [gender]: {
          ...(state.charts[gender] || {}),
          [ageGroup]: filledCharts,
        },
      },
    }));
  },

  setInitChart: (charts: ChartV2[], itemsPerPage: number) => {
    // charts 배열을 순회하며 각 차트를 처리
    charts.forEach(chartV2 => {
      const {chartKey, songs} = chartV2;
      // console.log('songs', songs);

      // chartKey에서 성별(gender)와 연령대(ageGroup)를 추출
      const [gender, ageGroup] = chartKey.split('_');

      // songs가 null일 경우 빈 배열로 초기화
      const filledCharts = [...(songs ?? [])];

      // itemsPerPage의 배수로 맞추기 위해 빈 데이터를 추가
      while (filledCharts.length % itemsPerPage !== 0) {
        filledCharts.push({
          songId: 0,
          songName: '',
          artistName: '',
          isMr: false,
          rankingChange: 0,
          new: '',
          ranking: 2,
          totalScore: 2,
          isNew: false,
          isLive: false,
          songNumber: 0,
          album: '',
        } as ChartSong);
      }

      // 상태 업데이트 (성별과 연령대 기준으로)
      set(state => ({
        charts: {
          ...state.charts,
          [gender]: {
            ...(state.charts[gender] || {}),
            [ageGroup]: filledCharts,
          },
        },
        genders: state.genders.includes(gender)
          ? state.genders
          : [...state.genders, gender],

        // 중복 없이 ageGroups에 추가
        ageGroups: state.ageGroups.includes(ageGroup)
          ? state.ageGroups
          : [...state.ageGroups, ageGroup],
      }));
    });
  },

  setSelectedCharts: (gender: string, ageGroup: string) => {
    set(state => {
      // charts 객체에서 해당 gender와 ageGroup의 차트를 가져옴
      const chartsForGenderAndAgeGroup = state.charts[gender]?.[ageGroup] || [];

      // 현재 선택된 차트가 이전의 selectedCharts와 다른 경우에만 업데이트
      if (chartsForGenderAndAgeGroup !== state.selectedCharts) {
        return {
          selectedCharts: chartsForGenderAndAgeGroup,
        };
      }

      // 만약 동일하다면 상태를 변경하지 않음
      return state;
    });
  },

  setUserGender: (userGender: string) => {
    const state = get();
    if (userGender !== state.userGender) {
      const chartsForSelected =
        state.charts[userGender]?.[state.userAgeGroup] || [];
      set({
        userGender,
        selectedGender: userGender,
        selectedCharts: chartsForSelected,
      });
    }
  },

  setUserAgeGroup: (userAgeGroup: string) => {
    const state = get();
    if (userAgeGroup !== state.userAgeGroup) {
      const chartsForSelected =
        state.charts[state.userGender]?.[userAgeGroup] || [];
      set({
        userAgeGroup,
        selectedAgeGroup: userAgeGroup,
        selectedCharts: chartsForSelected,
      });
    }
  },

  setSelectedGender: (selectedGender: string) => {
    const state = get();
    if (selectedGender !== state.selectedGender) {
      const chartsForSelected =
        state.charts[selectedGender]?.[state.selectedAgeGroup] || [];
      set({
        selectedGender,
        selectedCharts: chartsForSelected,
      });
    }
  },

  setSelectedAgeGroup: (selectedAgeGroup: string) => {
    const state = get();
    if (selectedAgeGroup !== state.selectedAgeGroup) {
      const chartsForSelected =
        state.charts[state.selectedGender]?.[selectedAgeGroup] || [];
      set({
        selectedAgeGroup,
        selectedCharts: chartsForSelected,
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
    return (
      Object.keys(state.charts).length === 0 ||
      Object.values(state.charts).some(genderCharts =>
        Object.values(genderCharts).some(chartArray => chartArray.length === 0),
      )
    );
  },
}));

export default useChartV2Store;

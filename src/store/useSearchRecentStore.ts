import {create} from 'zustand';
import {persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SearchRecentType} from '../types';

interface SearchRecentState {
  searchRecent: Map<number, SearchRecentType>;
  currentId: number;
  addSearchRecent: (searchRecent: Omit<SearchRecentType, 'id'>) => void;
  deleteSearchRecent: (searchRecentId: number) => void;
  orderedSearchRecents: SearchRecentType[];
}

interface PersistState {
  state: SearchRecentState;
  version: number;
}

const useSearchRecentStore = create(
  persist<SearchRecentState>(
    set => ({
      searchRecent: new Map(), // 초기 검색 기록은 빈 Map으로 설정
      currentId: 1, // 초기 ID는 1로 설정

      // 새로운 검색 기록을 추가하는 함수
      addSearchRecent: newSearchRecent =>
        set(state => {
          const newId = state.currentId; // 현재 ID를 가져옴
          const updatedMap = new Map(state.searchRecent); // 기존 검색 기록을 복사
          updatedMap.set(newId, {...newSearchRecent, id: newId}); // 새로운 검색 기록을 Map에 추가

          return {
            searchRecent: updatedMap, // 업데이트된 검색 기록 저장
            currentId: newId + 1, // 다음에 사용할 ID 증가
            orderedSearchRecents: Array.from(updatedMap.values()).reverse(), // 검색 기록을 최신 순으로 정렬하여 배열로 저장
          };
        }),

      // 특정 검색 기록을 삭제하는 함수
      deleteSearchRecent: searchRecentId =>
        set(state => {
          const updatedMap = new Map(state.searchRecent); // 기존 검색 기록을 복사
          updatedMap.delete(searchRecentId); // 해당 ID의 검색 기록 삭제

          return {
            searchRecent: updatedMap, // 업데이트된 검색 기록 저장
            orderedSearchRecents: Array.from(updatedMap.values()).reverse(), // 검색 기록을 최신 순으로 정렬하여 배열로 저장
          };
        }),

      orderedSearchRecents: [], // 초기 검색 기록 배열은 빈 배열로 설정
    }),
    {
      name: 'search-recent-storage', // AsyncStorage에 저장할 때 사용할 키 이름
      storage: {
        // getItem - 스토리지에서 데이터를 불러오는 함수
        getItem: async key => {
          const value = await AsyncStorage.getItem(key); // 해당 키로 저장된 데이터를 가져옴
          if (value) {
            const parsedValue = JSON.parse(value); // 데이터를 JSON 형식으로 파싱

            return {
              ...parsedValue, // version과 같은 메타데이터를 유지합니다.
              state: {
                ...parsedValue.state,
                searchRecent: new Map<number, SearchRecentType>(
                  parsedValue.state.searchRecent, // searchRecent 데이터를 Map으로 복원
                ),
              },
            };
          }
          return null; // 데이터가 없으면 null 반환
        },
        // setItem - 스토리지에 데이터를 저장하는 함수
        setItem: async (key, value) => {
          const parsedValue = value as unknown as PersistState; // 값을 PersistState 타입으로 변환
          const serializedValue = JSON.stringify({
            ...parsedValue,
            state: {
              ...parsedValue.state,
              searchRecent: Array.from(
                parsedValue.state.searchRecent.entries(),
              ), // Map을 배열 형식으로 변환하여 직렬화
            },
          });
          await AsyncStorage.setItem(key, serializedValue); // 데이터를 스토리지에 저장
        },
        // removeItem - 스토리지에서 데이터를 삭제하는 함수
        removeItem: async key => {
          await AsyncStorage.removeItem(key); // 해당 키로 저장된 데이터를 삭제
        },
      },
    },
  ),
);

export default useSearchRecentStore;

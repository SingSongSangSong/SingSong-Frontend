import {create} from 'zustand';
import {SearchRecentType} from '../types';

interface SearchRecentState {
  searchRecent: Map<number, SearchRecentType>;
  currentId: number; // 고유 ID를 관리하는 상태
  addSearchRecent: (searchRecent: Omit<SearchRecentType, 'id'>) => void;
  deleteSearchRecent: (searchRecentId: number) => void;
  getOrderedSearchRecents: () => SearchRecentType[];
}

const useSearchRecentStore = create<SearchRecentState>((set, get) => ({
  searchRecent: new Map(),
  currentId: 1, // 초기 ID 값

  addSearchRecent: newSearchRecent =>
    set(state => {
      const newId = state.currentId;
      const updatedMap = new Map(state.searchRecent);

      // 새로운 항목에 고유 ID를 부여하여 추가
      updatedMap.set(newId, {...newSearchRecent, id: newId});

      return {
        searchRecent: updatedMap,
        currentId: newId + 1, // ID 증가
      };
    }),

  deleteSearchRecent: searchRecentId =>
    set(state => {
      const updatedMap = new Map(state.searchRecent);
      updatedMap.delete(searchRecentId);

      return {
        searchRecent: updatedMap,
      };
    }),

  getOrderedSearchRecents: () => {
    // 저장된 순서대로 값을 가져옴
    return Array.from(get().searchRecent.values());
  },
}));

export default useSearchRecentStore;

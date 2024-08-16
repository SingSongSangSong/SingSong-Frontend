import {create} from 'zustand';
import {SearchRecentType} from '../types';

interface SearchRecentState {
  searchRecent: Map<number, SearchRecentType>;
  currentId: number;
  addSearchRecent: (searchRecent: Omit<SearchRecentType, 'id'>) => void;
  deleteSearchRecent: (searchRecentId: number) => void;
  orderedSearchRecents: SearchRecentType[]; // 최신 순서로 정렬된 검색 기록
}

const useSearchRecentStore = create<SearchRecentState>(set => ({
  searchRecent: new Map(),
  currentId: 1,

  addSearchRecent: newSearchRecent =>
    set(state => {
      const newId = state.currentId;
      const updatedMap = new Map(state.searchRecent);
      updatedMap.set(newId, {...newSearchRecent, id: newId});

      return {
        searchRecent: updatedMap,
        currentId: newId + 1,
        orderedSearchRecents: Array.from(updatedMap.values()).reverse(),
      };
    }),

  deleteSearchRecent: searchRecentId =>
    set(state => {
      const updatedMap = new Map(state.searchRecent);
      updatedMap.delete(searchRecentId);

      return {
        searchRecent: updatedMap,
        orderedSearchRecents: Array.from(updatedMap.values()).reverse(),
      };
    }),

  orderedSearchRecents: [],
}));

export default useSearchRecentStore;

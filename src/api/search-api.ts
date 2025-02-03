import {API_SEARCH} from '../constants/api';
import axiosInstance from './axiosIns';

export async function getSearch(searchKeyword: string) {
  const res = await axiosInstance.get(API_SEARCH.SEARCH_KEYWORD(searchKeyword));
  return res.data;
}

export async function getSearchArtistName(
  searchKeyword: string,
  page: number,
  size: number,
) {
  const res = await axiosInstance.get(API_SEARCH.SEARCH_ARTIST, {
    params: {keyword: searchKeyword, page: page, size: size},
  });
  return res.data;
}

export async function getSearchSongName(
  searchKeyword: string,
  page: number,
  size: number,
) {
  const res = await axiosInstance.get(API_SEARCH.SEARCH_SONG_NAME, {
    params: {keyword: searchKeyword, page: page, size: size},
  });
  return res.data;
}

export async function getSearchSongNumber(
  searchKeyword: string,
  page: number,
  size: number,
) {
  const res = await axiosInstance.get(API_SEARCH.SEARCH_SONG_NUMBER, {
    params: {keyword: searchKeyword, page: page, size: size},
  });
  return res.data;
}

export async function getRecentSearch(size: number) {
  const res = await axiosInstance.get(API_SEARCH.SEARCH_RECENT, {
    params: {
      size,
    },
  });
  return res.data;
}

import {API_SONG} from '../constants/api';
import {TagProps} from '../types';
import axiosInstance from './axiosIns';

export async function getSongsNew(cursor: number, size: number) {
  const params: {cursor?: number; size: number} = {size: size};
  if (cursor !== -1) {
    params.cursor = cursor;
  }
  const res = await axiosInstance.get('v1/songs/new', {
    params,
  });
  return res.data;
}

export async function deleteSongsReviews(songNumber: string) {
  const res = await axiosInstance.delete(API_SONG.SONG_REVIEW(songNumber));
  return res.data;
}

export async function getV2Chart() {
  const res = await axiosInstance.get(API_SONG.SONG_CHART);
  return res.data;
}

export async function getSongReviewOptions() {
  const res = await axiosInstance.get(API_SONG.SONG_REVIEW_OPTIONS);
  return res.data;
}

export async function getSongs(songNumber: string) {
  const res = await axiosInstance.get(API_SONG.SONG_DETAIL(songNumber));
  return res.data;
}

export async function getSongsRelated(
  songNumber: string,
  page: number,
  size: number,
) {
  const res = await axiosInstance.get(API_SONG.SONG_RELATED(songNumber), {
    params: {page, size},
  });

  return res.data;
}

export async function getSongsReviews(songNumber: string) {
  const res = await axiosInstance.get(API_SONG.SONG_REVIEW(songNumber));
  return res.data;
}

export async function putSongReviews(
  songNumber: string,
  songReviewOptionId: number,
) {
  const res = await axiosInstance.put(API_SONG.SONG_REVIEW(songNumber), {
    songReviewOptionId,
  });

  return res.data;
}

export async function getRcdHomeSongs() {
  const res = await axiosInstance.get(API_SONG.SONG_RECOMMEND_HOME);
  return res.data;
}

export async function postRcdHome(tags: TagProps) {
  const res = await axiosInstance.post(API_SONG.SONG_RECOMMEND_HOME, tags);
  return res.data;
}

export async function postRcdRefreshV2(page: number, tag: string) {
  const res = await axiosInstance.post(API_SONG.SONG_RECOMMEND_REFRESH, {
    page,
    tag,
  });
  return res.data;
}

export async function getTags() {
  const res = await axiosInstance.get(API_SONG.SONG_TAG);
  return res.data;
}

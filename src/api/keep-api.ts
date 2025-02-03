import {API_KEEP} from '../constants/api';
import axiosInstance from './axiosIns';

export async function getKeepV2(filter: string, cursor: number, size: number) {
  const params: {filter: string; cursor?: number; size: number} = {
    filter: filter,
    size: size,
  };
  if (cursor !== -1) {
    params.cursor = cursor;
  }
  const res = await axiosInstance.get(API_KEEP.KEEP_V2, {params});
  return res.data;
}

export async function postKeep(songNumbers: number[]) {
  const res = await axiosInstance.post(API_KEEP.KEEP_V1, {songId: songNumbers});
  return res.data;
}

export async function deleteKeep(songNumbers: number[]) {
  const res = await axiosInstance.delete(API_KEEP.KEEP_V1, {
    data: {songIds: songNumbers},
  });
  return res.data;
}

export async function getRecentKeep(size: number) {
  const res = await axiosInstance.get(API_KEEP.KEEP_RECENT, {
    params: {size},
  });
  return res.data;
}

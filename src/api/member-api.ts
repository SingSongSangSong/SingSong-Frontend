import {request} from 'react-native-permissions';
import {API_MEMBER} from '../constants/api';
import axiosInstance from './axiosIns';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants';

// : Promise<Tarot>

export async function getMember() {
  const res = await axiosInstance.get(API_MEMBER.MEMBER);
  return res.data;
}

export async function patchMemberNickname(nickname: string) {
  const res = await axiosInstance.patch(API_MEMBER.NICKNAME, {nickname});
  return res.data;
}

export async function postMemberLoginV2(
  token: string,
  idToken: string,
  provider: string,
) {
  const requestData: any = {
    idToken: idToken,
    provider: provider,
  };

  if (provider !== 'Anonymous') {
    requestData.deviceToken = token;
  }
  const res = await axiosInstance.post(API_MEMBER.LOGIN, requestData);
  return res.data;
}

export async function postMemberLoginExtra(birthYear: string, gender: string) {
  const res = await axiosInstance.post(API_MEMBER.LOGIN_EXTRA, {
    birthYear,
    gender,
  });
  return res.data;
}

export async function postMemberLogout() {
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  const res = await axiosInstance.post(API_MEMBER.LOGOUT, {
    refreshToken,
  });
  AsyncStorage.removeItem(ACCESS_TOKEN);
  AsyncStorage.removeItem(REFRESH_TOKEN);
  return res.data;
}

export async function postMemberReissue() {
  const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  const res = await axiosInstance.post(API_MEMBER.REISSUE, {
    accessToken,
    refreshToken,
  });
  return res.data;
}

export async function postMemberWithdraw() {
  //토큰 삭제 필요
  const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN);
  const res = await axiosInstance.post(API_MEMBER.WITHDRAW, {
    refreshToken,
  });
  AsyncStorage.removeItem(ACCESS_TOKEN);
  AsyncStorage.removeItem(REFRESH_TOKEN);
  return res.data;
}

export async function postBlacklist(memberId: number) {
  const res = await axiosInstance.post(API_MEMBER.BLACKLIST, {memberId});
  return res.data;
}

export async function deleteBlacklist(memberIds: number[]) {
  const res = await axiosInstance.delete(API_MEMBER.BLACKLIST, {
    data: {memberIds},
  });
  return res.data;
}

export async function getBlacklist() {
  const res = await axiosInstance.get(API_MEMBER.BLACKLIST);
  return res.data;
}

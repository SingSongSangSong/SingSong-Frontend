import {
  appStackNavigations,
  authNavigations,
  homeStackNavigations,
  keepStackNavigations,
  mainTabNavigations,
} from '../constants';
import {Comment} from './comment';
import {Song} from './songs';

type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
};

type MainTabParamList = {
  [mainTabNavigations.PLAYGROUND]: undefined;
  [mainTabNavigations.HOME]: undefined;
  [mainTabNavigations.KEEP]: undefined;
};

type AppStackParamList = {
  [appStackNavigations.SPLASH]: undefined;
  [appStackNavigations.MAIN]: undefined;
  [appStackNavigations.LOGIN]: undefined;
  [appStackNavigations.TERMS]: {provider: string; idToken: string};
};

type HomeStackParamList = {
  [homeStackNavigations.RCD_HOME]: undefined;
  [homeStackNavigations.RCD_DETAIL]: {tag: string};
  [homeStackNavigations.SETTING]: undefined;
  [homeStackNavigations.SONG_DETAIL]: {
    songId: number;
    songNumber: number;
    songName: string;
    singerName: string;
    album: string;
    melonLink: string;
    isMr: boolean;
  };
  [homeStackNavigations.COMMENT]: {songNumber: number; songId: number};
  [homeStackNavigations.RECOMMENT]: {comment: Comment};
  [homeStackNavigations.REPORT]: {
    reportCommentId: number;
    reportSubjectMemberId: number;
  };
  [homeStackNavigations.TAG_DETAIL]: undefined;
  [homeStackNavigations.BLACKLIST]: undefined;
  [homeStackNavigations.SEARCH]: undefined;
  [homeStackNavigations.AI_RECOMMENDATION]: undefined;
  [homeStackNavigations.NICKNAME_CHANGE]: {nickname: string};
  [homeStackNavigations.AI_LLM]: undefined;
  [homeStackNavigations.AI_LLM_RESULT]: {resultSong: Song[]};
};

type KeepStackParamList = {
  [keepStackNavigations.KEEP]: undefined;
  [keepStackNavigations.KEEP_EDIT]: undefined;
  [keepStackNavigations.KEEP_SONG_DETAIL]: {
    songId: number;
    songNumber: number;
    songName: string;
    singerName: string;
    album: string;
    melonLink: string;
    isMr: boolean;
  };
  [keepStackNavigations.KEEP_COMMENT]: {songNumber: number; songId: number};
  [keepStackNavigations.KEEP_RECOMMENT]: {comment: Comment};
  [keepStackNavigations.KEEP_REPORT]: {
    reportCommentId: number;
    reportSubjectMemberId: number;
  };
};
export type {
  AuthStackParamList,
  MainTabParamList,
  AppStackParamList,
  HomeStackParamList,
  KeepStackParamList,
};

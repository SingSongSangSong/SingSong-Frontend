import {
  appStackNavigations,
  authNavigations,
  homeStackNavigations,
  keepStackNavigations,
  mainTabNavigations,
  playgroundStackNavigations,
  searchStackNavigations,
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
  [mainTabNavigations.SEARCH]: undefined;
};

type AppStackParamList = {
  [appStackNavigations.SPLASH]: undefined;
  [appStackNavigations.MAIN]: undefined;
  [appStackNavigations.LOGIN]: undefined;
  [appStackNavigations.TERMS]: undefined;
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
    isLive: boolean;
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
  [homeStackNavigations.AI_LLM_RESULT]: {resultSong: Song[]; character: string};
  [homeStackNavigations.NEW_SONG]: undefined;
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
    isLive: boolean;
  };
  [keepStackNavigations.KEEP_COMMENT]: {songNumber: number; songId: number};
  [keepStackNavigations.KEEP_RECOMMENT]: {comment: Comment};
  [keepStackNavigations.KEEP_REPORT]: {
    reportCommentId: number;
    reportSubjectMemberId: number;
  };
  [keepStackNavigations.KEEP_AI_RECOMMENDATION]: undefined;
};

type SearchStackParamList = {
  [searchStackNavigations.SEARCH]: undefined;
};

type PlaygroundStackParamList = {
  [playgroundStackNavigations.PLAYGROUND]: undefined;
  [playgroundStackNavigations.PLAYGROUND_POST_DETAIL]: {
    postId: number;
    title: string;
    content: string;
    createdAt: string;
    nickname: string;
    likes: number;
    commentCount: number;
  };
  [playgroundStackNavigations.PLAYGROUND_POST_WRITE]: undefined;
  [playgroundStackNavigations.PLAYGROUND_POST_REPORT]: {
    reportPostId: number;
    reportSubjectMemberId: number;
  };
  [playgroundStackNavigations.PLAYGROUND_COMMENT_REPORT]: {
    reportCommentId: number;
    reportCommentSubjectMemberId: number;
  };
  [playgroundStackNavigations.PLAYGROUND_POST_SONG_ADDITION]: undefined;
};

export type {
  AuthStackParamList,
  MainTabParamList,
  AppStackParamList,
  HomeStackParamList,
  KeepStackParamList,
  PlaygroundStackParamList,
  SearchStackParamList,
};

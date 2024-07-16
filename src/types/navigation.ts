import {
  authNavigations,
  mainNavigations,
  playlistNavigations,
  rcdNavigations,
} from '../constants';

type AuthStackParamList = {
  [authNavigations.AUTH_HOME]: undefined;
  [authNavigations.LOGIN]: undefined;
};

type MainStackParamList = {
  [mainNavigations.SPLASH]: undefined;
  [mainNavigations.HOME]: undefined;
  [mainNavigations.RECOMMENDATION]: {tag: string};
  [playlistNavigations.PLAYLIST]: undefined;
  [playlistNavigations.SONGLIST]: {playlistId: string};
};

type rcdTabParamList = {
  [rcdNavigations.RCD_TAG]: undefined;
  [rcdNavigations.RCD_HOME]: {tag: string};

  [rcdNavigations.RCD_KEEP]: undefined;
};

export type {AuthStackParamList, MainStackParamList, rcdTabParamList};

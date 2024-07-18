import {
  appStackNavigations,
  authNavigations,
  homeStackNavigations,
  mainTabNavigations,
} from '../constants';

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
};

type HomeStackParamList = {
  [homeStackNavigations.RCD_HOME]: undefined;
  [homeStackNavigations.RCD_DETAIL]: {tag: string};
};
export type {
  AuthStackParamList,
  MainTabParamList,
  AppStackParamList,
  HomeStackParamList,
};

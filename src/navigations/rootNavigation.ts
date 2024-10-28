// RootNavigation.ts
import {
  createNavigationContainerRef,
  CommonActions,
} from '@react-navigation/native';
import {AppStackParamList} from '../types';
import {appStackNavigations} from '../constants';

export const navigationRef = createNavigationContainerRef<AppStackParamList>();

export function navigateToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  }
}

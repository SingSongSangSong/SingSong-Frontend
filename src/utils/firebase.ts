import analytics from '@react-native-firebase/analytics';

const logButtonClick = async (buttonName: string) => {
  await analytics().logEvent('button_click', {
    button_name: buttonName,
  });
  console.log(`Logged button click: ${buttonName}`);
};

const logScreenView = async (screenName: string) => {
  analytics().logEvent('screen_view', {
    screen_name: screenName,
  });
  console.log('Logged screen view:', screenName);
};

const logToggleClick = async (buttonName: string) => {
  analytics().logEvent('toggle_click', {
    button_name: buttonName,
  });
  console.log(`Logged toggle click: ${buttonName}`);
};

const logSwipe = async (swipeName: string, index: number) => {
  await analytics().logEvent('swipe', {
    swipe_name: swipeName,
    swipe_index: index,
  });
  console.log(`Logged swipe: ${swipeName}`);
};

const logRefresh = async (refreshName: string) => {
  await analytics().logEvent('refresh', {
    refresh_name: refreshName,
  });
  console.log(`Logged refresh: ${refreshName}`);
};

const logNavigationClick = async (fromPage: string, toPage: string) => {
  await analytics().logEvent('navigation_click', {
    from_page: fromPage,
    to_page: toPage,
  });
  console.log(`Logged navigation from: ${fromPage} to: ${toPage}`);
};

export {
  logButtonClick,
  logScreenView,
  logToggleClick,
  logSwipe,
  logRefresh,
  logNavigationClick,
};

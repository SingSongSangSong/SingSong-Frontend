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
    screen_class: screenName,
  });
  console.log('Logged screen view:', screenName);
};

export {logButtonClick, logScreenView};

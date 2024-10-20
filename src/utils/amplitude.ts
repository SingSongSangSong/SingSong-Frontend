import * as amplitude from '@amplitude/analytics-react-native';

const logPageView = (name: string) => {
  // amplitude.track('Page View', {
  //   page_name: name, // 현재 페이지 이름을 Amplitude에 기록
  // });
  amplitude.track(`${name}_page_view`);
};

const logTrack = (name: string) => {
  amplitude.track(name);
};

export {logPageView, logTrack};

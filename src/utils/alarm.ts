import PushNotification from 'react-native-push-notification';
import {alarmDays, alarmMessages} from '../constants';

const scheduleNotification = () => {
  // 현재 시간을 가져온 후, 하루 뒤(24시간 뒤)로 설정합니다.
  //   const date = new Date(Date.now() + 24 * 60 * 60 * 1000);

  //   PushNotification.localNotificationSchedule({
  //     channelId: 'rn-push-notification-channel-id-4-300', // 채널 ID 설정
  //     title: 'Scheduled Notification', // 알림 제목
  //     message: 'This is a notification scheduled for 24 hours later', // 알림 내용
  //     date, // 하루 뒤의 시간
  //     allowWhileIdle: true, // 절전 모드에서도 알림이 가도록 설정
  //   });

  alarmMessages.forEach((alarm, index) => {
    const date = new Date(Date.now() + alarmDays[index] * 24 * 60 * 60 * 1000); // 각 메시지를 예약할 날짜 설정

    PushNotification.localNotificationSchedule({
      channelId: 'rn-push-notification-channel-id-4-300', // 채널 ID 설정
      title: alarm.title, // 알림 제목
      message: alarm.message, // 알림 내용
      date, // 예약된 시간
      allowWhileIdle: true, // 절전 모드에서도 알림이 가도록 설정
    });
  });
};

const scheduleNotificationTest = () => {
  alarmMessages.forEach((alarm, index) => {
    const date = new Date(Date.now() + alarmDays[index] * 10 * 1000); // 각 메시지를 예약할 날짜 설정

    PushNotification.localNotificationSchedule({
      channelId: 'rn-push-notification-channel-id-4-300', // 채널 ID 설정
      title: alarm.title, // 알림 제목
      message: alarm.message, // 알림 내용
      date, // 예약된 시간
      allowWhileIdle: true, // 절전 모드에서도 알림이 가도록 설정
    });
  });
};

export {scheduleNotification, scheduleNotificationTest};

import {useEffect, useState} from 'react';
import {appStackNavigations, designatedColor} from '../constants';
import Toast from 'react-native-toast-message';
// import PermissionStore from '../store/PermissionStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList, TermItem} from '../types';
import {RadioButtonProps} from 'react-native-radio-buttons-group';
import {Keyboard, Platform} from 'react-native';
import {logTrack, scheduleNotification} from '../utils';
import {
  canScheduleExactAlarms,
  check,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import {postMemberLoginExtra} from '../api/member-api';

type UseTermsProps = {
  // provider: string;
  // idToken: string;
  navigation: StackNavigationProp<
    AppStackParamList,
    typeof appStackNavigations.TERMS
  >;
};

type TermsState = {
  [key: string]: boolean;
  termsOfService: boolean;
  personalInfo: boolean;
  thirdPartyInfo: boolean;
  marketingInfo: boolean;
  locationInfo: boolean;
};

const useTerms = ({navigation}: UseTermsProps) => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [birthYear, setBirthYear] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [terms, setTerms] = useState<TermsState>({
    termsOfService: false,
    personalInfo: false,
    thirdPartyInfo: false,
    marketingInfo: false,
    locationInfo: false,
  });

  const [radioButtons, setRadioButtons] = useState<RadioButtonProps[]>([
    {
      id: '1', // unique id for each button
      label: '남성',
      value: 'MALE',
      color: designatedColor.BLACK, // 라디오 버튼 색상
      labelStyle: {color: 'black'},
      selected: false,
    },
    {
      id: '2',
      label: '여성',
      value: 'FEMALE',
      color: designatedColor.BLACK,
      labelStyle: {color: 'black'},
      selected: false,
    },
  ]);

  const termsList: TermItem[] = [
    {
      label: '[필수] 이용약관 동의',
      value: 'termsOfService',
      // url: 'https://piquant-leek-b2c.notion.site/ac414a53adc349868bb7c3584d1bb8b9',
      url: 'https://piquant-leek-b2c.notion.site/ac414a53adc349868bb7c3584d1bb8b9?pvs=4',
    },
    {
      label: '[필수] 개인정보 수집 및 이용 동의',
      value: 'personalInfo',
      // url: 'https://piquant-leek-b2c.notion.site/01eeabc64725442fac5c2ad91c6ab4',
      url: 'https://piquant-leek-b2c.notion.site/01eeabc64725442fac5c2ad91c6ab4a9?pvs=4',
    },
    // {label: '[선택] 제 3자 정보 제공 동의', value: 'thirdPartyInfo'},
    // {label: '[선택] 마케팅 정보 수신 동의', value: 'marketingInfo'},
    // {label: '[선택] 광고성 정보 수신 동의', value: 'locationInfo'},
  ];

  const [selectedId, setSelectedId] = useState<string | undefined>();

  useEffect(() => {
    setRadioButtons(prevButtons =>
      prevButtons.map(button => ({
        ...button,
        borderColor:
          button.id === selectedId
            ? designatedColor.BLACK
            : designatedColor.GRAY3,
      })),
    );
  }, [selectedId]);

  const handleOnPressRadioButton = (selectedId: string) => {
    Keyboard.dismiss();
    const selectedButton = radioButtons.find(
      button => button.id === selectedId,
    );
    setSelectedId(selectedId);

    if (selectedButton && selectedButton.value) {
      setGender(selectedButton.value);
    }
  };

  // 전체 동의 체크박스 눌렀을 때
  const handleAllChecked = (newValue: boolean) => {
    setIsAllChecked(newValue);
    setTerms({
      termsOfService: newValue,
      personalInfo: newValue,
      thirdPartyInfo: newValue,
      marketingInfo: newValue,
      locationInfo: newValue,
    });
  };

  // 개별 체크박스 변경 시
  const handleCheck = (key: string, newValue: boolean) => {
    setTerms({...terms, [key]: newValue});

    const allSelected = Object.keys(terms).every(k =>
      k === key ? newValue : terms[k as keyof typeof terms],
    );
    setIsAllChecked(allSelected);
  };

  const handleOnPressSubmission = async () => {
    if (birthYear !== '' && gender !== '' && birthYear.length === 4) {
      setIsLoggedProcess(true);
      await postMemberLoginExtra(birthYear, gender); // accessToken 받기, 설정해야됨
      // setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      // setSecureValue(REFRESH_TOKEN, data.data.refreshToken);

      try {
        if (Platform.OS === 'ios') {
          const authStatus = await messaging().hasPermission();
          if (authStatus === messaging.AuthorizationStatus.AUTHORIZED) {
            logTrack('local_notification_permission_granted');
            scheduleNotification();
          }
        } else {
          const isScheduled = await canScheduleExactAlarms();
          if (isScheduled) {
            scheduleNotification();
          }
          // if (Number(Platform.Version) === 33) {
          //   const notificationPermission = await check(
          //     PERMISSIONS.ANDROID.POST_NOTIFICATIONS,
          //   );

          //   if (notificationPermission === RESULTS.GRANTED) {
          //     logTrack('local_notification_permission_granted');
          //     scheduleNotification(); // 알람 예약
          //   }
          // } else if (Number(Platform.Version) < 33) {
          //   logTrack('local_notification_permission_granted');
          //   scheduleNotification(); // 알람 예약
          // }
        }
      } catch (error) {
        setIsLoggedProcess(false); // false
        navigation.replace(appStackNavigations.MAIN); // 메인 화면으로 이동
      }
      setIsLoggedProcess(false); // false
      navigation.replace(appStackNavigations.MAIN); // 메인 화면으로 이동
    } else {
      let message = '모든 정보를 입력해주세요.';
      if (gender !== '' && birthYear !== '' && birthYear.length !== 4) {
        message = '태어난 년도를 정확히 입력해주세요.';
      }
      Toast.show({
        type: 'selectedToast',
        text1: message,
        position: 'bottom',
      });
      return false;
    }
  };

  return {
    termsList,
    isLoggedProcess,
    isAllChecked,
    isNextStep,
    birthYear,
    radioButtons,
    setBirthYear,
    gender,
    setGender,
    setIsNextStep,
    selectedId,
    terms,
    handleAllChecked,
    handleCheck,
    handleOnPressSubmission,
    // handleGenderToggle,
    handleOnPressRadioButton,
  };
};

export default useTerms;

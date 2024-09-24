import {useEffect, useState} from 'react';
import postMemberLogin from '../api/member/postMemberLogin';
import TokenStore from '../store/TokenStore';
import {
  ACCESS_TOKEN,
  appStackNavigations,
  designatedColor,
  REFRESH_TOKEN,
} from '../constants';
import Toast from 'react-native-toast-message';
import PermissionStore from '../store/PermissionStore';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList, TermItem} from '../types';
import {RadioButtonProps} from 'react-native-radio-buttons-group';
import {Keyboard} from 'react-native';

type UseTermsProps = {
  provider: string;
  idToken: string;
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

const useTerms = ({provider, idToken, navigation}: UseTermsProps) => {
  const [isLoggedProcess, setIsLoggedProcess] = useState<boolean>(false);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);
  const [isNextStep, setIsNextStep] = useState<boolean>(false);
  const [birthYear, setBirthYear] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const {setSecureValue} = TokenStore();
  const {setPermissionValue} = PermissionStore();
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
    {label: '[필수] 이용약관 동의', value: 'termsOfService'},
    {
      label: '[필수] 개인정보 수집 및 이용 동의',
      value: 'personalInfo',
    },
    {label: '[선택] 제 3자 정보 제공 동의', value: 'thirdPartyInfo'},
    {label: '[선택] 마케팅 정보 수신 동의', value: 'marketingInfo'},
    {label: '[선택] 광고성 정보 수신 동의', value: 'locationInfo'},
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
    if (idToken && birthYear != '' && gender != '' && birthYear.length == 4) {
      setIsLoggedProcess(true);
      const data = await postMemberLogin(idToken, provider!, birthYear, gender); //accessToken 받기, 설정해야됨
      setSecureValue(ACCESS_TOKEN, data.data.accessToken);
      setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
      setIsLoggedProcess(false); //false
      setPermissionValue('true');
      navigation.replace(appStackNavigations.MAIN);
    } else {
      let message = '모든 정보를 입력해주세요.';
      if (gender != '' && birthYear != '' && birthYear.length != 4) {
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

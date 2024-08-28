import {
  ActivityIndicator,
  Dimensions,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {LargeButton} from '../../components';
import KaKaoIcon from '../../assets/svg/kakao.svg';
import tw from 'twrnc';
import {appStackNavigations, designatedColor} from '../../constants';
import {AppStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import {useRoute} from '@react-navigation/native';
import {logScreenView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import useLogin from '../../hooks/useLogin';

type LoginScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log('route name', route.name);
  //     logScreenView(route.name); // 스크린이 포커스될 때 로그 이벤트 발생
  //   });

  //   return unsubscribe;
  // }, [navigation, route]);

  // const userInfoHandler = useUserInfo();
  const loginHandler = useLogin();

  const handleKakaoButton = async () => {
    try {
      await loginHandler.handleKakaoLogin();
      amplitude.track('MAIN');
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  const handleOnModalCloseButton = async () => {
    console.log('press!!');
    loginHandler.setIsModalVisible(false);
    await loginHandler._handleKakaoLogin();
    navigation.replace(appStackNavigations.MAIN); //메인으로 이동
  };

  const deviceHeight = Dimensions.get('window').height;

  return (
    <View
      style={[
        tw`w-full h-full bg-black items-center justify-start`,
        {paddingTop: deviceHeight * 0.1},
      ]}>
      <View style={tw`items-center justify-center`}>
        {/* Centered Image behind the Text */}
        <Image
          source={require('../../assets/png/effect.png')}
          style={[
            {width: 405 * 1.2, height: 140.81 * 1.2},
            tw`absolute`,
            {top: deviceHeight * 0.1 + 80}, // Adjust this value as necessary
          ]}
        />
        <View>
          <Text style={tw`text-white font-bold text-3xl pt-50 z-10`}>
            싱숭생숭한 기분을
          </Text>
        </View>
      </View>

      <View style={{marginTop: deviceHeight * 0.01}}>
        <Text
          style={tw`text-[${designatedColor.PINK}] font-bold text-3xl z-10`}>
          싱송생송하게
        </Text>
      </View>
      <View style={tw`absolute bottom-0 mb-20 w-full`}>
        <LargeButton
          title="카카오로 로그인"
          onPress={handleKakaoButton}
          color={designatedColor.KAKAO_YELLOW}
          Icon={KaKaoIcon}
        />
      </View>
      {loginHandler.isLoggedProcess && (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      <Modal
        transparent={true}
        visible={loginHandler.isModalVisible}
        animationType="fade">
        <View
          style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 px-8`}
          pointerEvents="box-none">
          <View style={tw`bg-white p-4 rounded-lg`}>
            <Text style={tw`text-black text-lg font-bold my-4`}>
              개인정보 처리방침 및 데이터 수집 동의
            </Text>
            <Text style={tw`text-black my-2`}>
              앱을 사용하기 위해서는 개인정보 처리방침과 데이터 수집 방침에
              동의해주셔야 합니다.
            </Text>
            <Text style={tw`text-[${designatedColor.GRAY1}] mt-2`}>
              - 개인정보 수집 및 사용 목적: 본 앱은 회원 가입, 로그인, 서비스
              제공, 고객 지원, 마케팅 및 분석 목적으로 최소한의 개인정보를
              수집합니다.
            </Text>
            <Text style={tw`text-[${designatedColor.GRAY1}] mt-2`}>
              - 데이터 수집 및 사용: 본 앱은 Firebase, Amplitude 등과 같은 분석
              도구를 사용하여 사용자의 앱 내 행동 데이터를 수집합니다. 이
              데이터는 서비스 개선, 사용자 경험 향상, 개인 맞춤형 콘텐츠 제공을
              위해 사용됩니다.
            </Text>
            <Text style={tw`text-[${designatedColor.GRAY1}] mt-2`}>
              - 데이터 제3자 제공: 수집된 데이터는 앱 성능 분석 및 마케팅
              목적으로 Firebase, Amplitude와 같은 제3자 서비스 제공자에게 공유될
              수 있습니다.
            </Text>
            <Text style={tw`text-black my-4`}>
              위 내용을 확인하였으며, 개인정보 처리방침과 데이터 수집 방침에
              동의합니다.
            </Text>
            <TouchableOpacity
              style={tw`my-6 mx-8 bg-black p-2 rounded`}
              activeOpacity={0.8}
              onPress={handleOnModalCloseButton}>
              <Text style={tw`text-white font-bold text-center`}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default LoginScreen;

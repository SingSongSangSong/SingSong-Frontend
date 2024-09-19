import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import {LargeButton} from '../../components';
import KaKaoIcon from '../../assets/svg/kakao.svg';
import tw from 'twrnc';
import {
  ACCESS_TOKEN,
  appStackNavigations,
  designatedColor,
  REFRESH_TOKEN,
} from '../../constants';
import {AppStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import useLogin from '../../hooks/useLogin';
import AppleBlackIcon from '../../assets/svg/appleLogo.svg';
// import GuestStore from '../../store/GuestStore';
import CustomText from '../../components/text/CustomText';
import postMemberLogin from '../../api/member/postMemberLogin';
import TokenStore from '../../store/TokenStore';
// import {AppleButton} from '@invertase/react-native-apple-authentication';

type LoginScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const loginHandler = useLogin();
  // console.log('prvalue', loginHandler.prValue);
  // const setIsGuest = GuestStore(state => state.setIsGuest);
  const {setSecureValue} = TokenStore();

  const handleKakaoButton = async () => {
    try {
      await loginHandler.handleKakaoLogin();
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  const handleKakaoButton2 = async () => {
    try {
      await loginHandler.handleKakaoLogin2();
      navigation.replace(appStackNavigations.MAIN);
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  const handleAppleButton = async () => {
    try {
      await loginHandler.handleAppleLogin();
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  const handleAppleButton2 = async () => {
    try {
      await loginHandler.handleAppleLogin2();
      navigation.replace(appStackNavigations.MAIN);
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  const handleOnModalCloseButton = async () => {
    const value = await loginHandler._handleLogin();
    if (value) {
      loginHandler.setPermissionValue('true');
      navigation.replace(appStackNavigations.MAIN); //메인으로 이동
    }
  };

  const handleGuestButton = async () => {
    // setIsGuest(true);
    // navigation.replace(appStackNavigations.MAIN);
    const data = await postMemberLogin('', 'Anonymous');
    setSecureValue(ACCESS_TOKEN, data.data.accessToken);
    setSecureValue(REFRESH_TOKEN, data.data.refreshToken);
    navigation.replace(appStackNavigations.MAIN);
  };

  const deviceHeight = Dimensions.get('window').height;

  return (
    <View
      style={[
        tw`w-full h-full bg-black items-center justify-start`,
        {paddingTop: deviceHeight * 0.25},
      ]}>
      <View style={tw`items-center`}>
        <View style={{position: 'absolute'}}>
          <Image
            source={require('../../assets/png/shinedLogo.png')}
            style={{width: 246, height: 129}}
          />
        </View>
      </View>

      <View style={tw`absolute bottom-0 mb-20 w-full items-center`}>
        {Platform.OS == 'ios' && (
          <View style={tw`mb-4`}>
            <LargeButton
              title="Sign in with Apple"
              onPress={
                loginHandler.prValue ? handleAppleButton2 : handleAppleButton
              }
              color={designatedColor.WHITE}
              Icon={AppleBlackIcon}
            />
          </View>
        )}
        <View style={tw`mb-4`}>
          <LargeButton
            title={
              Platform.OS == 'ios' ? 'Sign in with Kakao' : '카카오로 로그인'
            }
            onPress={
              loginHandler.prValue ? handleKakaoButton2 : handleKakaoButton
            }
            color={designatedColor.KAKAO_YELLOW}
            Icon={KaKaoIcon}
          />
        </View>

        <LargeButton
          title="GUEST"
          onPress={handleGuestButton}
          color="#D2E0FB"
        />
      </View>
      {loginHandler.isLoggedProcess && (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
          <ActivityIndicator size="large" color="#D2E0FB" />
        </View>
      )}

      <Modal
        transparent={true}
        visible={loginHandler.isModalVisible}
        animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={tw`flex-1 justify-center items-center bg-black bg-opacity-50 px-8`}
            pointerEvents="box-none">
            <View style={tw`bg-white p-4 rounded-lg w-full max-w-md`}>
              <View style={{height: deviceHeight * 0.7}}>
                {loginHandler.step === 1 ? (
                  <>
                    <View style={{flex: 1}}>
                      <CustomText style={tw`text-black text-lg font-bold my-4`}>
                        개인정보 처리방침 및 데이터 수집 동의
                      </CustomText>
                      <CustomText style={tw`text-black my-2`}>
                        앱을 사용하기 위해서는 개인정보 처리방침과 데이터 수집
                        방침에 동의해주셔야 합니다.
                      </CustomText>
                      <CustomText
                        style={tw`text-[${designatedColor.GRAY1}] mt-2`}>
                        - 개인정보 수집 및 사용 목적: 본 앱은 회원 가입, 로그인,
                        서비스 제공, 고객 지원, 마케팅 및 분석 목적으로 최소한의
                        개인정보를 수집합니다.
                      </CustomText>
                      <CustomText
                        style={tw`text-[${designatedColor.GRAY1}] mt-2`}>
                        - 본 단계에서 출생연도와 성별 정보를 수집합니다. 이
                        정보는 사용자 맞춤형 서비스 제공과 분석 목적으로
                        사용됩니다.
                      </CustomText>
                      <CustomText
                        style={tw`text-[${designatedColor.GRAY1}] mt-2`}>
                        - 데이터 수집 및 사용: 본 앱은 Firebase, Amplitude 등과
                        같은 분석 도구를 사용하여 사용자의 앱 내 행동 데이터를
                        수집합니다. 이 데이터는 서비스 개선, 사용자 경험 향상,
                        개인 맞춤형 콘텐츠 제공을 위해 사용됩니다.
                      </CustomText>
                      <CustomText
                        style={tw`text-[${designatedColor.GRAY1}] mt-2`}>
                        - 데이터 제3자 제공: 수집된 데이터는 앱 성능 분석 및
                        마케팅 목적으로 Firebase, Amplitude와 같은 제3자 서비스
                        제공자에게 공유될 수 있습니다.
                      </CustomText>
                      <CustomText style={tw`text-black my-4`}>
                        위 내용을 확인하였으며, 개인정보 처리방침과 데이터 수집
                        방침에 동의합니다.
                      </CustomText>
                    </View>
                    <TouchableOpacity
                      style={tw`my-6 mx-8 bg-black p-2 rounded`}
                      activeOpacity={0.8}
                      onPress={() => {
                        loginHandler.setStep(2);
                      }}>
                      <CustomText style={tw`text-white font-bold text-center`}>
                        동의하고 다음 단계로
                      </CustomText>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <View style={tw`flex-1 items-center justify-center`}>
                      <CustomText style={tw`text-black text-lg font-bold my-4`}>
                        출생연도와 성별을 입력해주세요
                      </CustomText>
                      <View style={tw`mx-3`}>
                        {/* 출생연도 입력 */}
                        <View style={tw`flex-row items-center`}>
                          <View
                            style={tw`my-4 mr-4 w-[16] justify-center items-center`}>
                            <CustomText style={tw`text-black`}>
                              출생연도
                            </CustomText>
                          </View>
                          <TextInput
                            style={tw`border border-gray-400 rounded p-2 w-40`}
                            placeholder="ex) 1990"
                            keyboardType="numeric"
                            value={loginHandler.birthYear}
                            onChangeText={loginHandler.setBirthYear}
                            maxLength={4}
                            autoFocus={true}
                          />
                        </View>
                        <View style={tw`flex-row items-center`}>
                          <View
                            style={tw`my-4 mr-4 w-[16] justify-center items-center`}>
                            <CustomText style={tw`text-black`}>성별</CustomText>
                          </View>

                          <View style={tw`flex-row justify-around px-2 w-40`}>
                            <TouchableOpacity
                              style={[
                                tw`px-4 py-2 rounded mr-4`,
                                loginHandler.gender === 'MALE'
                                  ? tw`bg-black`
                                  : tw`bg-gray-300`,
                              ]}
                              onPress={() => {
                                Keyboard.dismiss();
                                loginHandler.handleGenderToggle('MALE');
                              }}>
                              <CustomText style={tw`text-white text-center`}>
                                남성
                              </CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[
                                tw`px-4 py-2 rounded`,
                                loginHandler.gender === 'FEMALE'
                                  ? tw`bg-black`
                                  : tw`bg-gray-300`,
                              ]}
                              onPress={() => {
                                Keyboard.dismiss();
                                loginHandler.handleGenderToggle('FEMALE');
                              }}>
                              <CustomText style={tw`text-white text-center`}>
                                여성
                              </CustomText>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={tw`my-6 mx-8 bg-black p-2 rounded`}
                      activeOpacity={0.8}
                      onPress={handleOnModalCloseButton}>
                      <CustomText style={tw`text-white font-bold text-center`}>
                        완료
                      </CustomText>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default LoginScreen;

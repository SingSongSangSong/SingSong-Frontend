import {
  ActivityIndicator,
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import React, {useEffect} from 'react';
import {LargeButton} from '../../components';
import KaKaoIcon from '../../assets/svg/kakao.svg';
import tw from 'twrnc';
import {appStackNavigations, designatedColor} from '../../constants';
import {AppStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import useLogin from '../../hooks/useLogin';
import AppleBlackIcon from '../../assets/svg/appleLogo.svg';
import CustomText from '../../components/text/CustomText';
// import {AppleButton} from '@invertase/react-native-apple-authentication';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import {logPageView} from '../../utils';

type LoginScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const loginHandler = useLogin({navigation});

  const deviceHeight = Dimensions.get('window').height;

  useEffect(() => {
    logPageView('login');
  }, []);

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
            style={{width: 196.8, height: 103.2}}
          />
        </View>
      </View>

      <View style={tw`absolute bottom-0 mb-20 w-full items-center`}>
        {Platform.OS == 'ios' && (
          <View style={tw`mb-4`}>
            <LargeButton
              title="Sign in with Apple"
              onPress={
                loginHandler.handleAppleLogin
                // loginHandler.prValue
                //   ? loginHandler.handleAppleLogin2
                //   : loginHandler.handleAppleLogin
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
              loginHandler.handleKakaoLogin
              // loginHandler.prValue
              //   ? loginHandler.handleKakaoLogin2
              //   : loginHandler.handleKakaoLogin
            }
            color={designatedColor.KAKAO_YELLOW}
            Icon={KaKaoIcon}
          />
        </View>

        <TouchableOpacity
          onPress={loginHandler.handleGuestLogin}
          activeOpacity={0.8}
          style={tw`items-center justify-center`}>
          <View style={tw`flex-row items-center mt-2`}>
            <CustomText style={tw`text-white text-lg mr-2`}>Guest</CustomText>
            <ArrowRightIcon width={20} height={20} />
          </View>
        </TouchableOpacity>
      </View>
      {loginHandler.isLoggedProcess && (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
          <ActivityIndicator size="large" color="#D2E0FB" />
        </View>
      )}
    </View>
  );
}

export default LoginScreen;

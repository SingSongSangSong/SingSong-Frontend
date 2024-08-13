import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import React from 'react';
import {LargeButton} from '../../components';
import useUserInfo from '../../hooks/useUserInfo';
import KaKaoIcon from '../../assets/svg/kakao.svg';
import tw from 'twrnc';
import {appStackNavigations, designatedColor} from '../../constants';
import {AppStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';

type LoginScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.LOGIN
>;

function LoginScreen({navigation}: LoginScreenProps) {
  const userInfoHandler = useUserInfo();

  const handleKakaoButton = async () => {
    try {
      await userInfoHandler.handleKakaoLogin();

      navigation.navigate(appStackNavigations.MAIN); //메인으로 이동
    } catch (err) {
      console.error('Login Failed', err);
    }
  };

  const deviceHeight = Dimensions.get('window').height;

  return (
    <View
      style={[
        tw`w-full h-full bg-black items-center justify-start`,
        {paddingTop: deviceHeight * 0.1},
      ]}>
      <View style={tw`items-center`}>
        <View>
          <Text style={tw`text-white font-bold text-3xl pt-50`}>
            싱숭생숭한 기분을
          </Text>
        </View>
      </View>

      <View style={{marginTop: deviceHeight * 0.01}}>
        <Text style={tw`text-[${designatedColor.PINK}] font-bold text-3xl`}>
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
      {userInfoHandler.isLoggedProcess && (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
    </View>
  );
}

export default LoginScreen;

import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {
  appStackNavigations,
  designatedColor,
  homeStackNavigations,
} from '../../constants';
import {Image, SafeAreaView, Text, View} from 'react-native';
import useUserInfo from '../../hooks/useUserInfo';
import {TextButton} from '../../components';
import {CommonActions} from '@react-navigation/native';

type SettingScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.SETTING
>;

function SettingScreen({navigation}: SettingScreenProps) {
  const userInfoHandler = useUserInfo();

  const handleLogoutButton = () => {
    userInfoHandler.handleKakaoLogout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  };

  const handleWithdrawButton = () => {
    userInfoHandler.handleWithdraw();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  };

  const handleOnBlacklistButton = () => {
    navigation.navigate(homeStackNavigations.BLACKLIST);
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        <View style={tw`m-4`}>
          <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>내 계정</Text>
          <View style={tw`flex-row justify-between items-center mt-4 ml-2`}>
            <View style={tw`flex-row items-center`}>
              <Image
                source={require('../../assets/png/kakaotalk.png')}
                style={tw`w-4 h-4`}
              />
              <Text style={tw`text-white ml-2`}>
                {userInfoHandler.memberInfo?.email}
              </Text>
            </View>
            <TextButton
              title="로그아웃"
              onPress={handleLogoutButton}
              color="white"
              size={3}
            />
          </View>
        </View>
        <View style={tw`m-4`}>
          <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>
            개인 / 보안
          </Text>
          <View style={tw`mt-4 ml-2`}>
            <View style={tw`items-start mb-4`}>
              <TextButton
                title="댓글 차단 관리"
                onPress={handleOnBlacklistButton}
                color="white"
                size={4}
              />
            </View>
            <View style={tw`items-start`}>
              <TextButton
                title="회원 탈퇴"
                onPress={handleWithdrawButton}
                color="white"
                size={4}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SettingScreen;

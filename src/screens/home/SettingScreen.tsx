import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {
  appStackNavigations,
  designatedColor,
  homeStackNavigations,
} from '../../constants';
import {Image, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import useUserInfo from '../../hooks/useUserInfo';
import {CustomModal} from '../../components';
import {CommonActions, useRoute} from '@react-navigation/native';
import {logScreenView} from '../../utils';

type SettingScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.SETTING
>;

function SettingScreen({navigation}: SettingScreenProps) {
  const route = useRoute();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('route name', route.name);
      logScreenView(route.name); // 스크린이 포커스될 때 로그 이벤트 발생
    });

    return unsubscribe;
  }, [navigation, route]);

  const userInfoHandler = useUserInfo();
  const [isWithdraw, setIsWithdraw] = useState(false);

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
    navigation.push(homeStackNavigations.BLACKLIST);
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
            <TouchableOpacity
              onPress={handleLogoutButton}
              style={tw`py-2 px-3 border rounded-full border-[${designatedColor.GRAY3}]`}
              activeOpacity={0.8}>
              <Text style={tw`text-[${designatedColor.GRAY3}] text-[3]`}>
                로그아웃
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`m-4`}>
          <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>
            개인 / 보안
          </Text>
          <View style={tw`mt-4`}>
            <View style={tw`items-start mb-4`}>
              <TouchableOpacity
                style={tw`p-2`}
                activeOpacity={0.8}
                onPress={handleOnBlacklistButton}>
                <Text style={tw`text-white`}>댓글 차단 관리</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`p-2`}
                activeOpacity={0.8}
                onPress={() => setIsWithdraw(true)}>
                <Text style={tw`text-white`}>회원 탈퇴</Text>
              </TouchableOpacity>
            </View>
            {/* <View style={tw`items-start`}>
              <TextButton
                title="회원 탈퇴"
                onPress={() => setIsWithdraw(true)}
                color="white"
                size={4}
              />
            </View> */}
          </View>
        </View>
        <View style={tw`m-4`}>
          <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>기타</Text>
          <View style={tw`mt-4`}>
            <View style={tw`items-start mb-4`}>
              <TouchableOpacity
                style={tw`p-2`}
                activeOpacity={0.8}
                onPress={() => {}}>
                <Text style={tw`text-white`}>앱 정보</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`p-2`}
                activeOpacity={0.8}
                onPress={() => setIsWithdraw(true)}>
                <Text style={tw`text-white`}>서비스 정책</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CustomModal
            visible={isWithdraw}
            onClose={() => setIsWithdraw(false)}
            message={
              '탈퇴 후에는 다시 복구할 수 없습니다. \n그래도 계속 진행하시겠습니까?'
            }
            onConfirm={handleWithdrawButton}
            onCancel={() => setIsWithdraw(false)}
            confirmText="탈퇴"
            cancelText="취소"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SettingScreen;

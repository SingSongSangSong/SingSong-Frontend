import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {
  ACCESS_TOKEN,
  appStackNavigations,
  designatedColor,
  homeStackNavigations,
  REFRESH_TOKEN,
} from '../../constants';
import {
  Image,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomModal} from '../../components';
import {CommonActions} from '@react-navigation/native';
import VersionStore from '../../store/VersionStore';
import useSetting from '../../hooks/useSetting';
import AppleIcon from '../../assets/svg/appleWhiteLogo.svg';
import CustomText from '../../components/text/CustomText';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import GuestStore from '../../store/GuestStore';
import TokenStore from '../../store/TokenStore';
import {logPageView, logTrack} from '../../utils';

type SettingScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.SETTING
>;

function SettingScreen(props: SettingScreenProps) {
  const settingHandler = useSetting();
  const [isWithdraw, setIsWithdraw] = useState(false);
  const currentVersion = VersionStore(state => state.currentVersion);
  // const isGuest = GuestStore(state => state.isGuest);
  const {setGuestState, getGuestState} = GuestStore();
  // const isGuest = getGuestState();
  const {removeSecureValue} = TokenStore();
  const [isGuest, setIsGuest] = useState();

  useEffect(() => {
    initIsGuest();
    logPageView(props.route.name);
  }, []);

  const initIsGuest = async () => {
    const tempIsGuest = await getGuestState();
    setIsGuest(tempIsGuest);
  };

  const handleLogoutButton = async () => {
    await settingHandler.handleKakaoLogout();
    logTrack('logout');
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  };

  const handleWithdrawButton = async () => {
    await settingHandler.handleWithdraw();
    logTrack('withdraw');
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  };

  const handleOnBlacklistButton = () => {
    props.navigation.push(homeStackNavigations.BLACKLIST);
  };

  const handleOnPressNicknameChange = () => {
    props.navigation.push(homeStackNavigations.NICKNAME_CHANGE, {
      nickname: settingHandler.memberInfo?.nickname || '',
    });
  };

  const handleOnPressLoginButton = async () => {
    removeSecureValue(ACCESS_TOKEN);
    removeSecureValue(REFRESH_TOKEN);
    settingHandler.clearMemberInfo();
    settingHandler.clearProvider();
    await setGuestState(false);
    props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={tw`flex-1`}>
        <View style={tw`m-4`}>
          <CustomText style={tw`text-[${designatedColor.DARK_GRAY}]`}>
            내 계정
          </CustomText>
          {isGuest ? (
            <TouchableOpacity
              onPress={handleOnPressLoginButton}
              style={tw`flex-row justify-between items-center mt-4 p-2`}>
              <CustomText style={tw`text-white`}>Guest</CustomText>
              <View style={tw`flex-row items-center`}>
                <CustomText style={tw`text-[${designatedColor.GRAY3}] mr-2`}>
                  로그인
                </CustomText>
                <ArrowRightIcon width={20} height={20} />
              </View>
            </TouchableOpacity>
          ) : (
            <View style={tw`flex-row justify-between items-center mt-4 ml-2`}>
              <View style={tw`flex-row items-center`}>
                {settingHandler.provider == 'KAKAO_KEY' ? (
                  <Image
                    source={require('../../assets/png/kakaotalk.png')}
                    style={tw`w-4 h-4`}
                  />
                ) : (
                  // <Icon name="apple" size={30} color="#000" />
                  <AppleIcon width={32} height={32} />
                )}

                <CustomText style={tw`text-white ml-2`}>
                  {settingHandler.provider == 'KAKAO_KEY'
                    ? settingHandler.memberInfo?.email
                    : 'Apple'}
                </CustomText>
              </View>
              <TouchableOpacity
                onPress={handleLogoutButton}
                style={tw`py-2 px-3 border rounded-full border-[${designatedColor.GRAY3}]`}
                activeOpacity={0.8}>
                <CustomText
                  style={tw`text-[${designatedColor.GRAY3}] text-[3]`}>
                  로그아웃
                </CustomText>
              </TouchableOpacity>
            </View>
          )}
          <TouchableOpacity
            style={tw`p-2 mt-3`}
            activeOpacity={0.8}
            onPress={handleOnPressNicknameChange}>
            <View style={tw`w-full justify-between flex-row items-center`}>
              <CustomText style={tw`text-white`}>닉네임</CustomText>
              <View style={tw`flex-row items-center`}>
                <CustomText style={tw`text-[${designatedColor.GRAY3}] mr-2`}>
                  {settingHandler.memberInfo?.nickname &&
                  settingHandler.memberInfo?.nickname !== 'Anonymous'
                    ? settingHandler.memberInfo.nickname
                    : '닉네임을 설정해주세요'}
                </CustomText>
                <ArrowRightIcon width={20} height={20} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={tw`m-4`}>
          <CustomText style={tw`text-[${designatedColor.DARK_GRAY}]`}>
            개인 / 보안
          </CustomText>
          <View style={tw`mt-4`}>
            <View style={tw`items-start mb-4`}>
              <TouchableOpacity
                style={tw`p-2 mb-2`}
                activeOpacity={0.8}
                onPress={handleOnBlacklistButton}>
                <View style={tw`w-full justify-between flex-row`}>
                  <CustomText style={tw`text-white`}>댓글 차단 관리</CustomText>
                  <ArrowRightIcon width={20} height={20} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`p-2`}
                activeOpacity={0.8}
                onPress={() => setIsWithdraw(true)}>
                <View style={tw`w-full justify-between flex-row`}>
                  <CustomText style={tw`text-white`}>회원 탈퇴</CustomText>
                  <ArrowRightIcon width={20} height={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={tw`m-4`}>
          <CustomText style={tw`text-[${designatedColor.DARK_GRAY}]`}>
            기타
          </CustomText>
          <View style={tw`mt-4`}>
            <View style={tw`items-start mb-4`}>
              <View
                style={tw`w-full flex-row justify-between items-center p-2 mb-2`}>
                <CustomText style={tw`text-white`}>앱 버전 정보</CustomText>
                <CustomText style={tw`text-[${designatedColor.VIOLET}]`}>
                  {currentVersion}
                </CustomText>
              </View>
              <TouchableOpacity
                style={tw`p-2`}
                activeOpacity={0.8}
                onPress={() => {
                  Linking.openURL(
                    'https://piquant-leek-b2c.notion.site/3d562645e4e74abdbd8fd470541bf0a9?pvs=4',
                  );
                }}>
                <View style={tw`w-full justify-between flex-row`}>
                  <CustomText style={tw`text-white`}>서비스 정책</CustomText>
                  <ArrowRightIcon width={20} height={20} />
                </View>
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

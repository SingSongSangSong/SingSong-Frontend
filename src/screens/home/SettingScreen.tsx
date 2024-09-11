import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {
  appStackNavigations,
  designatedColor,
  homeStackNavigations,
} from '../../constants';
import {
  Image,
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CustomModal} from '../../components';
import {CommonActions} from '@react-navigation/native';
import VersionStore from '../../store/VersionStore';
import useSetting from '../../hooks/useSetting';
import AppleIcon from '../../assets/svg/appleWhiteLogo.svg';

type SettingScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.SETTING
>;

function SettingScreen({navigation}: SettingScreenProps) {
  const settingHandler = useSetting();
  const [isWithdraw, setIsWithdraw] = useState(false);
  const currentVersion = VersionStore(state => state.currentVersion);

  const handleLogoutButton = async () => {
    await settingHandler.handleKakaoLogout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: appStackNavigations.LOGIN}],
      }),
    );
  };

  const handleWithdrawButton = async () => {
    await settingHandler.handleWithdraw();
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
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={tw`flex-1`}>
        <View style={tw`m-4`}>
          <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>내 계정</Text>
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

              <Text style={tw`text-white ml-2`}>
                {settingHandler.provider == 'KAKAO_KEY'
                  ? settingHandler.memberInfo?.email
                  : 'Apple'}
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
          </View>
        </View>
        <View style={tw`m-4`}>
          <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>기타</Text>
          <View style={tw`mt-4`}>
            <View style={tw`items-start mb-4`}>
              <View
                style={tw`w-full flex-row justify-between items-center p-2`}>
                <Text style={tw`text-white`}>앱 버전 정보</Text>
                <Text style={tw`text-[${designatedColor.GRAY3}]`}>
                  {currentVersion}
                </Text>
              </View>
              <TouchableOpacity
                style={tw`p-2`}
                activeOpacity={0.8}
                onPress={() => {
                  Linking.openURL(
                    'https://piquant-leek-b2c.notion.site/3d562645e4e74abdbd8fd470541bf0a9?pvs=4',
                  );
                }}>
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

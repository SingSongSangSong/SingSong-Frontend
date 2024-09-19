import React, {useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import tw from 'twrnc';
import CustomText from '../../components/text/CustomText';
import patchMemberNickname from '../../api/member/patchMemberNickname';
import useMemberStore from '../../store/useMemberStore';
import Toast from 'react-native-toast-message';

type NicknameChangeScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.NICKNAME_CHANGE // 닉네임 변경 네비게이션 키 수정
>;

function NicknameChangeScreen(props: NicknameChangeScreenProps) {
  const {nickname} = props.route?.params || {};
  const [newNickname, setNewNickname] = useState('');
  const setMemberInfo = useMemberStore(state => state.setMemberInfo);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const isButtonDisabled =
    newNickname.trim().length <= 1 || newNickname.trim().length > 10;

  const handleNicknameChange = async () => {
    // 닉네임 변경 완료 로직
    if (newNickname.trim().length < 2 || newNickname.trim().length > 10) {
      setShowErrorMessage(true); // 길이 조건 불만족 시 에러 메시지 표시
      return;
    }

    console.log('새 닉네임:', newNickname);
    const tempData = await patchMemberNickname(newNickname);
    setMemberInfo(tempData.data);
    Toast.show({
      type: 'selectedToast',
      text1: '닉네임이 변경되었습니다.',
      position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
      visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
    });
    props.navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
        <View style={tw`flex-1 px-4`}>
          <CustomText style={tw`text-[16px] font-bold text-white mt-6 mb-4`}>
            새로운 닉네임을 입력해주세요
          </CustomText>
          <TextInput
            style={[
              tw`mt-4 p-3 border-[0.3px] bg-[${designatedColor.GRAY5}] text-white rounded-lg`,
              showErrorMessage
                ? tw`border-[${designatedColor.RED}]`
                : tw`border-[${designatedColor.GRAY4}]`,
            ]}
            placeholder={nickname}
            placeholderTextColor={designatedColor.GRAY3}
            value={newNickname}
            // onChangeText={setNewNickname}
            onChangeText={text => {
              setNewNickname(text);
              if (text.trim().length >= 2 && text.trim().length <= 10) {
                setShowErrorMessage(false); // 유효한 길이일 경우 에러 메시지 숨기기
              } else {
                setShowErrorMessage(true); // 유효하지 않은 길이일 경우 에러 메시지 표시
              }
            }}
            maxLength={20} // 닉네임 최대 길이 설정 (필요시 조정)
          />
          <CustomText
            style={[
              tw`mt-2 ml-2 text-[12px] font-light`,
              showErrorMessage
                ? tw`text-[${designatedColor.RED}]`
                : tw`text-[${designatedColor.BACKGROUND_BLACK}]`,
            ]}>
            닉네임을 2~10자로 입력해주세요
          </CustomText>

          <TouchableOpacity
            style={[
              tw`mt-6 py-4 rounded-lg`,
              isButtonDisabled
                ? tw`bg-[${designatedColor.GRAY3}]`
                : tw`bg-[${designatedColor.PINK2}]`,
            ]}
            disabled={isButtonDisabled}
            onPress={handleNicknameChange}>
            <CustomText
              style={[
                tw`text-center font-bold`,
                isButtonDisabled ? tw`text-white` : tw`text-black`,
              ]}>
              변경 완료
            </CustomText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default NicknameChangeScreen;

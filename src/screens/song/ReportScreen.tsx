import React, {useEffect} from 'react';
import {SafeAreaView, Text, TextInput, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, KeepStackParamList} from '../../types';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
} from '../../constants';
import {OutlineButton, RadioButton} from '../../components';
import useReport from '../../hooks/useReport';
import {logScreenView} from '../../utils';

type ReportScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_REPORT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.REPORT>;

function ReportScreen(props: ReportScreenProps) {
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     console.log('route name', props.route.name);
  //     logScreenView(props.route.name); // 스크린이 포커스될 때 로그 이벤트 발생
  //   });

  //   return unsubscribe;
  // }, [props]);

  const commentId = props.route?.params?.reportCommentId; // 초기 카테고리
  const subjectMemberId = props.route?.params?.reportSubjectMemberId;
  const reportHandler = useReport(commentId, subjectMemberId);

  return (
    <SafeAreaView style={tw`flex-1 bg-black px-4`}>
      <Text style={tw`text-white font-bold text-lg my-10`}>
        신고 사유를 적어주세요
      </Text>
      <RadioButton handleOnPress={reportHandler.handleOnPressRadioButton} />
      <TextInput
        ref={reportHandler.textInputRef}
        style={tw`border-[${designatedColor.GRAY4}] h-40 border rounded-lg text-white`}
        multiline
        numberOfLines={4}
        value={reportHandler.text}
        onChangeText={reportHandler.setText}
        placeholder={reportHandler.placeholder}
        placeholderTextColor="gray"
        editable={reportHandler.isEditable}
        onFocus={reportHandler.handleOnFocus}
        onBlur={reportHandler.handleOnBlur}
      />
      <View style={tw`m-20`}>
        <OutlineButton
          title="신고하기"
          onPress={reportHandler.handleOnPressSubmit}
          color={designatedColor.GRAY3}
        />
      </View>
    </SafeAreaView>
  );
}

export default ReportScreen;

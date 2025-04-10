import React, {useEffect} from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {
  HomeStackParamList,
  KeepStackParamList,
  SearchStackParamList,
} from '../../types';
import {
  designatedColor,
  homeStackNavigations,
  keepStackNavigations,
  searchStackNavigations,
} from '../../constants';
import {OutlineButton, RadioButton} from '../../components';
import useReport from '../../hooks/useReport';
import CustomText from '../../components/text/CustomText';
import {logPageView} from '../../utils';

type ReportScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_REPORT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.REPORT>
  | StackScreenProps<
      SearchStackParamList,
      typeof searchStackNavigations.SEARCH_REPORT
    >;

function ReportScreen(props: ReportScreenProps) {
  const commentId = props.route?.params?.reportCommentId; // 초기 카테고리
  const subjectMemberId = props.route?.params?.reportSubjectMemberId;
  const reportHandler = useReport(commentId, subjectMemberId);

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  return (
    <SafeAreaView style={tw`flex-1 bg-black px-4`}>
      <CustomText style={tw`text-white font-bold text-lg my-10`}>
        신고 사유를 적어주세요
      </CustomText>
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

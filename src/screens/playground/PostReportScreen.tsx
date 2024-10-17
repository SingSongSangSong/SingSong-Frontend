import React, {useEffect} from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {PlaygroundStackParamList} from '../../types';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import {OutlineButton, RadioButton} from '../../components';
import CustomText from '../../components/text/CustomText';
import {logPageView} from '../../utils';
import usePostReport from '../../hooks/usePostReport';

type PostReportScreenProps = StackScreenProps<
  PlaygroundStackParamList,
  typeof playgroundStackNavigations.PLAYGROUND_POST_REPORT
>;

function PostReportScreen(props: PostReportScreenProps) {
  const postId = props.route?.params?.reportPostId; // 초기 카테고리
  const subjectMemberId = props.route?.params?.reportSubjectMemberId;
  const reportHandler = usePostReport({
    navigation: props.navigation,
    postId: postId,
    subjectMemberId: subjectMemberId,
  });

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

export default PostReportScreen;

import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, KeepStackParamList} from '../../types';
import {homeStackNavigations, keepStackNavigations} from '../../constants';

type ReportScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_REPORT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.REPORT>;

function ReportScreen(props: ReportScreenProps) {
  const commentId = props.route?.params?.reportCommentId; // 초기 카테고리
  const subjectMemberId = props.route?.params?.reportSubjectMemberId;

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <Text style={tw`text-white`}>report screen</Text>
      <Text style={tw`text-white`}>{commentId}</Text>
      <Text style={tw`text-white`}>{subjectMemberId}</Text>
    </SafeAreaView>
  );
}

export default ReportScreen;

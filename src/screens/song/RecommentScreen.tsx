import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList, KeepStackParamList} from '../../types';
import {homeStackNavigations, keepStackNavigations} from '../../constants';
import {CommentKeyboard, Recommentlist} from '../../components';
import useRecomment from '../../hooks/useRecomment';

type RecommentScreenProps =
  | StackScreenProps<
      KeepStackParamList,
      typeof keepStackNavigations.KEEP_RECOMMENT
    >
  | StackScreenProps<HomeStackParamList, typeof homeStackNavigations.RECOMMENT>;

function RecommentScreen(props: RecommentScreenProps) {
  const comment = props.route?.params?.comment; // 초기 카테고리

  //   const commentHandler = useComment(songNumber, songId);
  const recommentHandler = useRecomment(comment);

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      {/* <View style={tw`w-full justify-end m-0`}>
        <CommentKeyboard onSendPress={commentHandler.handleOnPressSendButton} />
      </View> */}
      <View style={tw`flex-1`}>
        {recommentHandler.parentComment && (
          <Recommentlist
            parentComment={recommentHandler.parentComment}
            recomments={recommentHandler.recomments}
          />
        )}
      </View>

      <View style={tw`w-full justify-end m-0`}>
        <CommentKeyboard
          onSendPress={recommentHandler.handleOnPressSendButton}
          text="답글"
        />
      </View>
    </SafeAreaView>
  );
}

export default RecommentScreen;

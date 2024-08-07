import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import tw from 'twrnc';

export const CommentKeyboard: React.FC = () => {
  const [comment, setComment] = useState('');

  return (
    <View style={tw`w-full`}>
      <View style={tw`flex-row items-center`}>
        <TextInput
          style={tw`flex-1 bg-gray-800 text-white p-3 rounded-full mr-2`}
          value={comment}
          onChangeText={setComment}
          placeholder="댓글을 입력하세요"
          placeholderTextColor="gray"
        />
        <Button
          title="전송"
          onPress={() => {
            /* 댓글 전송 로직 */
            console.log('comment:', comment);
          }}
        />
      </View>
    </View>
  );
};

import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import tw from 'twrnc';
import SendIcon from '../../assets/svg/send.svg';
import {IconButton} from '../button/IconButton';

interface CommentKeyboardProps {
  onSendPress: (content: string) => void;
}

export const CommentKeyboard: React.FC<CommentKeyboardProps> = ({
  onSendPress,
}) => {
  const [comment, setComment] = useState('');

  return (
    <View style={tw`w-full`}>
      <View style={tw`flex-row items-center`}>
        <TextInput
          style={tw`flex-1 bg-gray-800 text-white p-3 rounded-xl mr-2`}
          value={comment}
          onChangeText={setComment}
          placeholder="댓글을 입력하세요"
          placeholderTextColor="gray"
        />
        <IconButton
          Icon={SendIcon}
          onPress={() => {
            onSendPress(comment);
          }}
          size={24}
        />
      </View>
    </View>
  );
};

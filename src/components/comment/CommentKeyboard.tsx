import React, {useState} from 'react';
import {View, TextInput, Keyboard} from 'react-native';
import tw from 'twrnc';
import SendIcon from '../../assets/svg/send.svg';
import {IconButton} from '../button/IconButton';

interface CommentKeyboardProps {
  onSendPress: (content: string) => void;
  text: string;
}

export const CommentKeyboard: React.FC<CommentKeyboardProps> = ({
  onSendPress,
  text,
}) => {
  const [comment, setComment] = useState('');
  const handleOnSendPress = () => {
    onSendPress(comment);
    setComment('');
    Keyboard.dismiss();
  };

  return (
    <View style={tw`w-full bg-black`}>
      <View style={tw`flex-row items-center py-4`}>
        <TextInput
          style={tw`flex-1 bg-gray-800 text-white p-3 rounded-xl mr-2`}
          value={comment}
          onChangeText={setComment}
          placeholder={`${text}을 입력하세요`}
          placeholderTextColor="gray"
        />
        <IconButton Icon={SendIcon} onPress={handleOnSendPress} size={24} />
      </View>
    </View>
  );
};

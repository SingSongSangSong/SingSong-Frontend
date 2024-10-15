import React, {useState} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  InputAccessoryView,
  useWindowDimensions,
} from 'react-native';
import tw from 'twrnc';
import SendIcon from '../../assets/svg/send.svg';
import {IconButton} from '../button/IconButton';
import {designatedColor} from '../../constants';

interface CommentKeyboardProps {
  onSendPress: (content: string) => void;
  text: string;
}

export const CommentKeyboard: React.FC<CommentKeyboardProps> = ({
  onSendPress,
  text,
}) => {
  const [comment, setComment] = useState('');
  const [inputHeight, setInputHeight] = useState(0);
  const handleOnSendPress = () => {
    onSendPress(comment);
    setComment('');
    Keyboard.dismiss();
  };

  // const {width} = useWindowDimensions();

  return (
    // <InputAccessoryView style={[tw`bg-black w-full`]}>
    <View style={[tw`bg-[${designatedColor.BACKGROUND_BLACK}] w-full`]}>
      <View
        style={tw`flex-row items-center py-4 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
        <TextInput
          style={[
            tw`flex-1 bg-gray-800 text-white p-3 rounded-xl mx-2`,
            {height: Math.min(Math.max(40, inputHeight), 60)}, // 최소 1줄, 최대 2줄 높이로 설정
          ]}
          value={comment}
          onChangeText={setComment}
          placeholder={`${text}을 입력하세요`}
          placeholderTextColor="gray"
          multiline={true} // 멀티라인 활성화
          scrollEnabled={true} // 입력이 많아지면 스크롤 가능
          onContentSizeChange={event =>
            setInputHeight(event.nativeEvent.contentSize.height)
          } // 텍스트 입력 시 높이 조절
        />
        <View style={tw`pr-4`}>
          <IconButton Icon={SendIcon} onPress={handleOnSendPress} size={24} />
        </View>
      </View>
      {/* </InputAccessoryView> */}
    </View>
  );
};

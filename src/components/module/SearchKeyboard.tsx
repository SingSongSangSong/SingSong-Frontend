import React, {useState} from 'react';
import {
  View,
  TextInput,
  Keyboard,
  InputAccessoryView,
  useWindowDimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import tw from 'twrnc';
// import SendIcon from '../../assets/svg/send.svg';
// import {IconButton} from '../button/IconButton';
import SearchIcon from '../../assets/svg/search.svg';
import {designatedColor} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface SearchKeyboardProps {
  onSearchPress: (content: string) => void;
  text: string;
}

const SearchKeyboard: React.FC<SearchKeyboardProps> = ({
  onSearchPress,
  text,
}) => {
  const [sentence, setSentence] = useState<string>('');
  const [inputHeight, setInputHeight] = useState(0);
  //   const handleOnSendPress = () => {
  //     onSendPress(comment);
  //     setComment('');
  //     Keyboard.dismiss();
  //   };

  // const {width} = useWindowDimensions();
  const handleOnSubmitEditing = () => {
    if (sentence.trim()) {
      onSearchPress(sentence);
      setSentence(''); // 텍스트 입력 초기화
      Keyboard.dismiss(); // 키보드 숨기기
    }
  };

  return (
    // <InputAccessoryView
    //   style={[tw`bg-[${designatedColor.BACKGROUND_BLACK}] w-full py-3`]}>
    <View style={[tw`bg-[${designatedColor.BACKGROUND_BLACK}] w-full py-3`]}>
      <View
        style={tw`flex-row items-center my-4 bg-[${designatedColor.GRAY5}] rounded-full px-4 mx-2 border-[0.5px] border-[${designatedColor.PINK2}]`}>
        <TextInput
          style={[
            tw`flex-1 text-white py-1 mx-2`,
            // {height: Math.min(Math.max(40, inputHeight), 60)},
          ]}
          value={sentence}
          onChangeText={setSentence}
          placeholder={text}
          placeholderTextColor="gray"
          multiline={true} // 멀티라인 활성화
          scrollEnabled={true} // 입력이 많아지면 스크롤 가능
          blurOnSubmit={true} // 엔터 눌렀을 때 멀티라인에서도 제출 가능하게
          onSubmitEditing={handleOnSubmitEditing} // 엔터 버튼 클릭 시 호출
          onContentSizeChange={event =>
            setInputHeight(event.nativeEvent.contentSize.height)
          } // 텍스트 입력 시 높이 조절
        />
        <TouchableOpacity
          onPress={handleOnSubmitEditing}
          disabled={sentence == ''}
          activeOpacity={0.8}>
          <SearchIcon />
        </TouchableOpacity>
      </View>
    </View>
    // </InputAccessoryView>
  );
};

export {SearchKeyboard};

import React from 'react';
import {View, TextInput, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import RoundDeleteIcon from '../../../assets/svg/roundDelete.svg';
import SearchIcon from '../../../assets/svg/search.svg';
import {designatedColor} from '../../../constants';
import ArrowLeftIcon from '../../../assets/svg/arrowLeft.svg';

type SearchInputProps = {
  inputText: string;
  setInputText: (inputText: string) => void;
  handleOnPressBack: () => void;
  handleOnSubmit: () => void;
  handleInputFocus: () => void;
  inputRef?: React.RefObject<TextInput>;
};

const SearchInput = ({
  inputText,
  setInputText,
  handleOnPressBack,
  handleOnSubmit,
  handleInputFocus,
  inputRef,
}: SearchInputProps) => {
  return (
    <View
      style={tw`flex-row items-center bg-[${designatedColor.BACKGROUND_BLACK}] p-3`}>
      <TouchableOpacity onPress={handleOnPressBack}>
        <ArrowLeftIcon width={20} height={20} style={tw`mr-3`} />
      </TouchableOpacity>
      <View
        style={tw`flex-1 flex-row items-center bg-[${designatedColor.GRAY4}] rounded-lg px-3`}>
        {Platform.OS === 'ios' ? (
          <SearchIcon width={20} height={20} style={tw`mr-3`} />
        ) : (
          <Icon name="search" size={20} color="#BEBEBE" style={tw`mr-3`} />
        )}
        <TextInput
          ref={inputRef}
          style={tw`flex-1 text-white h-10`}
          placeholder="노래 제목/가수 이름/노래방 번호"
          placeholderTextColor={designatedColor.BEIGE}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleOnSubmit} // 엔터 키를 눌렀을 때 handleOnSubmit 호출
          returnKeyType="search" // 키보드에서 표시되는 엔터 키를 "search"로 설정 (옵션)
          onFocus={handleInputFocus}
        />
        {inputText != '' && (
          <TouchableOpacity
            onPress={() => {
              setInputText('');
            }}
            style={tw`p-2 pr-0`}>
            <RoundDeleteIcon />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export {SearchInput};

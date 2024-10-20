import React from 'react';
import {View, TextInput, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import tw from 'twrnc';
import RoundDeleteIcon from '../../../assets/svg/roundDelete.svg';
import ArrowLeftIcon from '../../../assets/svg/arrowLeft.svg';
import SearchIcon from '../../../assets/svg/search.svg';
import {designatedColor} from '../../../constants';

type SearchInputForPostSongProps = {
  inputText: string;
  setInputText: (inputText: string) => void;
  handleOnPressBack: () => void;
  handleOnSubmit: () => void;
  handleInputFocus: () => void;
  inputRef?: React.RefObject<TextInput>;
};

const SearchInputForPostSong = ({
  inputText,
  setInputText,
  handleOnPressBack,
  handleOnSubmit,
  handleInputFocus,
  inputRef,
}: SearchInputForPostSongProps) => {
  return (
    <View
      style={tw`flex-row items-center bg-[${designatedColor.BACKGROUND_BLACK}] p-3`}>
      <View
        style={tw`flex-1 flex-row items-center rounded-lg px-3 border-b-[0.5px] border-[${designatedColor.WHITE}]`}>
        {Platform.OS === 'ios' ? (
          <SearchIcon width={20} height={20} style={tw`mr-3`} />
        ) : (
          <Icon name="search" size={20} color="#BEBEBE" style={tw`mr-3`} />
        )}
        <TextInput
          ref={inputRef}
          style={tw`flex-1 text-white h-10`}
          placeholder="검색어를 입력해보세요."
          placeholderTextColor="#BEBEBE"
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

export {SearchInputForPostSong};

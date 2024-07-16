// components/AddToPlaylistButton.tsx
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import PlusIcon from '../../assets/plus.svg';
import {MsgBox} from '../../components'; // Assuming MsgBox is already a component

type AddToPlaylistButtonProps = {
  title: string;
  onPress: () => void;
  modalVisible: boolean;
  onCloseModal: () => void;
};

const AddTextButton: React.FC<AddToPlaylistButtonProps> = ({
  title,
  onPress,
  modalVisible,
  onCloseModal,
}) => {
  return (
    <View style={tw`flex-row justify-center m-3`}>
      <TouchableOpacity
        style={tw`p-2 flex-row justify-center items-center`}
        onPress={onPress}>
        <PlusIcon width={16} height={16} />
        <Text style={tw`text-white font-bold text-sm ml-2`}>{title}</Text>
      </TouchableOpacity>
      <MsgBox
        visible={modalVisible}
        message={`${title}에 추가되었습니다.`}
        onClose={onCloseModal}
      />
    </View>
  );
};

export {AddTextButton};

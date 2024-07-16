import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import tw from 'twrnc';

type MsgBoxProps = {
  visible: boolean;
  message: string;
  onClose: () => void;
};

const MsgBox = ({visible, message, onClose}: MsgBoxProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}>
      <View style={tw`flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]`}>
        <View style={tw`w-75 p-5 bg-white rounded-lg items-center`}>
          <Text style={tw`text-lg font-bold`}>{message}</Text>
          <TouchableOpacity onPress={onClose} style={tw`mt-5`}>
            <Text style={tw`text-lg text-blue-500`}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export {MsgBox};

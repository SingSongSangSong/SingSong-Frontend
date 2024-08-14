import React from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

type CustomModalProps = {
  visible: boolean;
  onClose: () => void;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

const CustomModal = ({
  visible,
  onClose,
  message,
  onConfirm,
  onCancel,
  confirmText = '확인',
  cancelText = '취소',
}: CustomModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white p-5 rounded-2xl w-4/5 h-1/5 justify-between`}>
          <View />
          <Text style={tw`text-black text-sm mb-4 text-center`}>{message}</Text>
          <View style={tw`flex-row justify-end`}>
            <TouchableOpacity
              style={tw`bg-gray-300 py-2 px-4 rounded-lg mr-2`}
              onPress={onCancel}>
              <Text style={tw`text-black text-center`}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-black py-2 px-4 rounded-lg`}
              onPress={onConfirm}>
              <Text style={tw`text-white text-center`}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {CustomModal};

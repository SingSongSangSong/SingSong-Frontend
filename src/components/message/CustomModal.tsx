import React, {useEffect} from 'react';
import {View, Text, Modal, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

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
        <View style={tw`bg-white w-4/5 h-1/4 justify-between`}>
          <View />
          <CustomText
            style={[
              tw`text-black text-[17px] mb-4 text-center mx-6`,
              {lineHeight: 24},
            ]}>
            {message}
          </CustomText>
          {/* <View style={tw`flex-row justify-end`}>
            <TouchableOpacity
              style={tw`bg-gray-300 py-2 px-4 rounded-lg mr-2`}
              onPress={onCancel}>
              <CustomText style={tw`text-black text-center`}>
                {cancelText}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`bg-black py-2 px-4 rounded-lg`}
              onPress={onConfirm}>
              <CustomText style={tw`text-white text-center`}>
                {confirmText}
              </CustomText>
            </TouchableOpacity>
          </View> */}
          <View style={tw`flex-row`}>
            <TouchableOpacity
              style={tw`flex-1 bg-gray-300 py-3`}
              onPress={onCancel}>
              <CustomText style={tw`text-black text-center`}>
                {cancelText}
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw`flex-1 bg-[${designatedColor.VIOLET}] py-3`}
              onPress={onConfirm}>
              <CustomText style={tw`text-white text-center`}>
                {confirmText}
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {CustomModal};

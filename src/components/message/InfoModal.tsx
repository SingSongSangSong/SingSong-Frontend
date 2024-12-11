import React from 'react';
import {View, Modal, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

type InfoModalProps = {
  visible: boolean;
  onClose: () => void;
  message: string;
};

const InfoModal = ({visible, onClose, message}: InfoModalProps) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View
        style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
        <View style={tw`bg-white w-4/5 justify-between pt-10`}>
          <View />
          <CustomText
            style={[
              tw`text-black text-[17px] mb-4 mx-6 text-center text-center`,
              {lineHeight: 24},
            ]}>
            안녕하세요, 고객님
          </CustomText>
          {/* message={`안녕하세요, 고객님.\n
            현재 더 나은 서비스를 제공하기 위해 서버 점검을 진행 중입니다.\n
            이용에 불편을 드려 진심으로 죄송합니다. 점검이 완료되는 대로 신속히 복구하겠습니다. \n
            잠시만 기다려 주시면 감사하겠습니다.\n
            점검 기간: ${initHandler.stopDuration}`} */}
          <CustomText
            style={[
              tw`text-black text-[17px] mb-4 mx-6 text-center text-center`,
              {lineHeight: 24},
            ]}>
            현재 더 나은 서비스를 제공하기 위해 서버 점검을 진행 중입니다.
          </CustomText>
          <CustomText
            style={[
              tw`text-black text-[17px] mb-4 mx-6 text-center text-center`,
              {lineHeight: 24},
            ]}>
            이용에 불편을 드려 진심으로 죄송합니다.
          </CustomText>
          <CustomText
            style={[
              tw`text-black text-[17px] mb-4 mx-6 text-center text-center`,
              {lineHeight: 24},
            ]}>
            점검이 완료되는 대로 신속히 복구하겠습니다.
          </CustomText>
          <CustomText
            style={[
              tw`text-black text-[17px] mb-4 mx-6 text-center text-center pb-5`,
              {lineHeight: 24},
            ]}>
            점검 기간: {message}
          </CustomText>
          <View style={tw`flex-row`}>
            <TouchableOpacity
              style={tw`flex-1 bg-[${designatedColor.VIOLET}] py-3`}
              onPress={onClose}>
              <CustomText style={tw`text-white text-center`}>확인</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export {InfoModal};

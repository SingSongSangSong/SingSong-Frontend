import React from 'react';
import {TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import PlusIcon from '../../assets/svg/plus.svg';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

interface AddTextButtonProps {
  title: string;
  onPress: (title: string) => void;
  isCenter: boolean;
}

const AddTextButton = ({
  title,
  onPress,
  isCenter = false,
}: AddTextButtonProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(title)}
      style={[
        tw`px-4 py-2 flex-row items-center border border-[${designatedColor.GRAY4}] rounded-full`,
        isCenter && tw`justify-center items-center`,
      ]}
      activeOpacity={0.8}>
      <PlusIcon width={18} height={18} />
      <CustomText
        style={tw`text-[${designatedColor.TEXT_WHITE}] text-sm font-semibold pr-1`}>
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export {AddTextButton};

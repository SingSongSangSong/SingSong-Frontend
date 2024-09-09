import React from 'react';
import {Pressable, Text, View} from 'react-native';
import tw from 'twrnc';

interface LargeButtonProps {
  title: string;
  onPress: () => void;
  color: string;
  Icon: any;
}

const LargeButton: React.FC<LargeButtonProps> = ({
  title,
  onPress,
  color,
  Icon,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={tw`bg-[${color}] rounded-xl justify-center items-center flex-row h-[56px] w-[280px]`}>
      <View style={tw`flex-row items-center justify-center`}>
        <Icon height="60px" />
        <Text
          style={[
            tw`text-[16px] text-black`,
            // title == 'Sign in with Kakao' && tw`ml-4`,
            title == '카카오로 로그인' && tw`ml-4`,
          ]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export {LargeButton};

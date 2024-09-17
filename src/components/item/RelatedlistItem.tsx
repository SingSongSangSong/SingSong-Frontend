import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';

interface RelatedlistItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
  onPress: () => void;
}

const RelatedlistItem = ({
  songNumber,
  songName,
  singerName,
  onPress,
}: RelatedlistItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={tw`flex-row items-center`}>
        {/* <View style={tw`h-[20] w-[20] bg-[#C7E3BE]`} /> */}
        {/* <Image
          source={{
            uri: 'https://t2.daumcdn.net/thumb/R720x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/8fXh/image/dCyJyeNJ50BMG489LQg9cokHUpk.jpg',
          }}
          // style={styles.image}
          style={tw`w-12 h-12 rounded-sm`}
        /> */}
        <View style={tw`justify-center items-center w-[12]`}>
          <CustomText
            style={tw`text-white text-sm text-[${designatedColor.GREEN}] font-bold`}>
            {songNumber}
          </CustomText>
        </View>

        <View style={tw`flex-1 ml-4`}>
          <View style={tw`flex-row`}>
            <CustomText
              style={tw`text-white text-sm flex-1`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {songName}
            </CustomText>
          </View>

          <CustomText
            style={tw`text-white text-sm mt-1 text-[${designatedColor.DARK_GRAY}]`}>
            {singerName}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {RelatedlistItem};

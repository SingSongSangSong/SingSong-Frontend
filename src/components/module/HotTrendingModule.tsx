import React from 'react';
import {Text, View} from 'react-native';
import tw from 'twrnc';
import useChartStore from '../../store/useChartStore';
import {formatDateString} from '../../utils';
import {designatedColor} from '../../constants';
import {ToggleButton} from '../button/ToggleButton';
import {HotTrending} from '..';
import {EmptyHotTrending} from '..';

const HotTrendingModule = () => {
  const {selectedGender, setSelectedGender, time} = useChartStore();

  const changeGender = () => {
    if (selectedGender === 'FEMALE') {
      setSelectedGender('MALE');
    } else {
      setSelectedGender('FEMALE');
    }
  };

  const toggleSwitch = () => {
    changeGender();
  };

  return (
    <View>
      {/* Header Section */}
      <View style={tw`flex-row justify-between mx-4 mt-6`}>
        <View style={tw`flex-row items-end mb-2`}>
          <Text style={tw`text-[${designatedColor.PINK}] font-bold text-xl`}>
            HOT TRENDING
          </Text>
          {time && (
            <Text style={tw`text-[${designatedColor.PINK2}] text-[10px] mx-3`}>
              {formatDateString(time)}
            </Text>
          )}
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-[${designatedColor.GRAY3}] mr-2`}>
            {selectedGender === 'FEMALE' ? '여자' : '남자'}
          </Text>
          <ToggleButton toggleSwitch={toggleSwitch} />
        </View>
      </View>

      {/* Trending Content */}
      <View>{selectedGender ? <HotTrending /> : <EmptyHotTrending />}</View>
    </View>
  );
};

export {HotTrendingModule};

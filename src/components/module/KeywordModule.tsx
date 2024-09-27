import React from 'react';
import {View} from 'react-native';
import {getRandomKeywords} from '../../utils';
import {designatedColor, keywordList} from '../../constants';
import CustomText from '../text/CustomText';
import tw from 'twrnc';
// import InfoIcon from '../../assets/svg/Info.svg';
import {CustomTooltipInfo} from '../info/CustomTooltipInfo';
// import {useState} from 'react';

const KeywordModule = () => {
  const randomKeywords = getRandomKeywords(keywordList, 3);
  //   const [visible, setVisible] = useState(false);
  return (
    <View
      style={tw`flex-1 py-4 mx-2 mt-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={tw`flex-row items-center mx-4`}>
        <CustomText style={tw`text-base text-white py-2`}>
          다른 사용자들이 검색한 키워드
        </CustomText>
        <CustomTooltipInfo text=" 다른 사용자들이 검색한 키워드 중 가장 인기 있는 검색어가 노출됩니다." />
      </View>
      {randomKeywords.map((keyword, index) => (
        <View key={index} style={tw`flex-row items-center mx-4 py-1`}>
          <CustomText
            style={[tw`text-base mr-2`, {color: designatedColor.PINK2}]}>
            #
          </CustomText>
          <CustomText style={[tw`text-sm`, {color: designatedColor.GRAY1}]}>
            {keyword}
          </CustomText>
        </View>
      ))}
    </View>
  );
};

export {KeywordModule};

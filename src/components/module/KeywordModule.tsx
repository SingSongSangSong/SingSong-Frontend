import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';
import tw from 'twrnc';
// import InfoIcon from '../../assets/svg/Info.svg';
// import {CustomTooltipInfo} from '../info/CustomTooltipInfo';
import {Tooltip} from 'react-native-elements';
import InfoIcon from '../../assets/svg/Info.svg';
import {useQuery} from '@tanstack/react-query';
import getRcdRecommendationSearchLog from '../../api/recommendation/getRcdRecommendationSearchLog';
// import {useState} from 'react';

const KeywordModule = (refreshing: string) => {
  const [sampleKeywords, setSampleKeywords] = useState<string[]>([]);

  //   const [visible, setVisible] = useState(false);
  // useEffect(() => {
  //   const randomKeywords = getRandomKeywords(keywordList, 3);
  //   setSampleKeywords(randomKeywords);
  // }, []);
  const {
    data: tempSearchLogs,
    error: searchLogsError,
    isFetching: isFetchingSearchLogs,
    refetch,
  } = useQuery({
    queryKey: ['searchLogs'],
    queryFn: getRcdRecommendationSearchLog,
    staleTime: 3600000,
    select: data => data.data.searchTexts,
  });

  useEffect(() => {
    if (refreshing) {
      refetch();
    }
  }, [refreshing, refetch]);

  useEffect(() => {
    if (tempSearchLogs) {
      setSampleKeywords(tempSearchLogs);
    }
  }, [tempSearchLogs]);

  return (
    <View
      style={tw`flex-1 pb-4 mx-2 mt-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
      <View style={tw`flex-row items-center mx-4`}>
        <CustomText style={tw`text-base text-white py-2 mr-1`}>
          다른 사용자들이 검색한 키워드
        </CustomText>
        <Tooltip
          popover={
            <CustomText
              style={[
                tw`text-[10px] text-[${designatedColor.WHITE}]`,
                {lineHeight: 18},
              ]}>
              다른 사용자들이 검색한 키워드 중 가장 최근 검색어가 노출됩니다.
            </CustomText>
          } // 툴팁에 표시할 내용
          backgroundColor={designatedColor.GRAY5} // 툴팁 배경 색상
          height={60} // 툴팁 높이
          width={200} // 툴팁 너비
          containerStyle={{borderRadius: 10}} // 툴팁 컨테이너 스타일
          withOverlay={false} // 배경이 흐려지는 효과를 없앰
          placement="top"
          skipAndroidStatusBar // 안드로이드 상태 표시줄을 피해서 위치가 밀리는 현상을 줄임
        >
          {/* <Icon name="info" type="material" color="purple" size={24} /> */}
          <InfoIcon width={16} height={16} />
        </Tooltip>

        {/* <CustomTooltipInfo text=" 다른 사용자들이 검색한 키워드 중 가장 인기 있는 검색어가 노출됩니다." /> */}
      </View>
      {sampleKeywords.map((keyword, index) => (
        <View key={index} style={tw`flex-row items-center mx-4 py-1`}>
          <CustomText
            style={[tw`text-base mr-2`, {color: designatedColor.VIOLET}]}>
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

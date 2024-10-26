import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';
import tw from 'twrnc';
import {Tooltip} from 'react-native-elements';
import InfoIcon from '../../assets/svg/Info.svg';
import {useQuery} from '@tanstack/react-query';
import getRcdRecommendationSearchLog from '../../api/recommendation/getRcdRecommendationSearchLog';

interface KeywordModuleProps {
  refreshing: boolean;
}

const KeywordModule = ({refreshing}: KeywordModuleProps) => {
  const [sampleKeywords, setSampleKeywords] = useState<string[]>([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {data: tempSearchLogs, refetch} = useQuery({
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
      // console.log('tempSearchLogs:', tempSearchLogs);
      setSampleKeywords(tempSearchLogs);
    }
  }, [tempSearchLogs]);

  const itemHeight = 40; // 각 키워드 항목의 높이를 설정하세요

  useEffect(() => {
    // 자동 스크롤 애니메이션
    const interval = setInterval(() => {
      if (scrollViewRef.current) {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;

          if (nextIndex < sampleKeywords.length) {
            // 마지막 항목이 아닐 때
            scrollViewRef.current.scrollTo({
              y: itemHeight * nextIndex,
              animated: true,
            });
          } else {
            // 마지막 항목에서 첫 번째로 부드럽게 이동
            scrollViewRef.current.scrollTo({
              y: 0,
              animated: false,
            });
            return 0; // 인덱스를 처음으로 리셋
          }

          return nextIndex;
        });
      }
    }, 2000); // 2초 간격으로 스크롤

    return () => clearInterval(interval);
  }, [sampleKeywords]);

  return (
    <View
      style={tw`flex-1 w-full mt-2 bg-[${designatedColor.BACKGROUND_BLACK}] ml-8`}>
      {/* <View style={tw`flex-row items-center`}>
        <Tooltip
          popover={
            <CustomText
              style={[
                tw`text-[10px] text-[${designatedColor.WHITE}]`,
                {lineHeight: 18},
              ]}>
              다른 사용자들이 검색한 키워드 중 가장 최근 검색어가 노출됩니다.
            </CustomText>
          }
          backgroundColor={designatedColor.GRAY5}
          height={60}
          width={200}
          containerStyle={{borderRadius: 10}}
          withOverlay={false}
          placement="top"
          skipAndroidStatusBar>
          <InfoIcon width={14} height={14} />
        </Tooltip>
        <CustomText
          style={tw`text-[11px] text-white py-1 ml-1 text-[${designatedColor.GRAY1}]`}>
          다른 사용자들이 검색한 키워드
        </CustomText>
      </View> */}

      {/* 텍스트 슬라이드 애니메이션 */}
      <ScrollView
        ref={scrollViewRef}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        snapToInterval={itemHeight}
        decelerationRate="normal"
        style={{height: itemHeight}}>
        {sampleKeywords &&
          sampleKeywords.map((keyword, index) => (
            <View key={index} style={{height: itemHeight}}>
              <View style={tw`flex-row items-center mx-2 my-1`}>
                <CustomText
                  style={[tw`text-base mr-2`, {color: designatedColor.VIOLET}]}>
                  #
                </CustomText>
                <CustomText
                  style={{
                    color: designatedColor.WHITE,
                    fontSize: 14,
                    maxWidth: '85%', // 텍스트가 부모 View의 85%까지만 확장되도록 설정
                  }}
                  numberOfLines={1} // 최대 한 줄까지만 표시
                  ellipsizeMode="tail" // 두 줄 초과 시 '...'으로 생략
                >
                  {keyword}
                </CustomText>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export {KeywordModule};

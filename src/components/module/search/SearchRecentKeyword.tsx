import React, {useEffect, useState} from 'react';
import {View, ScrollView, Dimensions, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import getRecentSearch from '../../../api/recent/getRecentSearch';
import CustomText from '../../text/CustomText';
import {designatedColor} from '../../../constants';
import RefreshIcon from '../../../assets/svg/refreshIcon.svg';
import SearchIcon from '../../../assets/svg/searchViolet.svg';
import {formatDateRecentSearch, showToast} from '../../../utils';

interface SearchRecentKeywordProps {
  onPressRecentKeyword: (keyword: string) => void;
}

const SearchRecentKeyword = ({
  onPressRecentKeyword,
}: SearchRecentKeywordProps) => {
  const [recentKeywordLst, setRecentKeywordLst] = useState<string[][]>([
    ['', '', '', '', ''],
  ]); // 초기값을 빈 문자열 배열로 설정
  const [currentDate, setCurrentDate] = useState<string>(
    formatDateRecentSearch(),
  );
  const [currentPage, setCurrentPage] = useState(0);
  const screenWidth = Dimensions.get('window').width;

  const {
    data: tempRecentKeywordLst,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['searchRecentKeyword'],
    queryFn: () => getRecentSearch(10),
    staleTime: 3600000,
    select: data => data.data,
  });

  useEffect(() => {
    if (tempRecentKeywordLst && !isFetching) {
      const groupedKeywords = [];
      for (let i = 0; i < tempRecentKeywordLst.length; i += 5) {
        groupedKeywords.push(tempRecentKeywordLst.slice(i, i + 5));
      }
      setRecentKeywordLst(groupedKeywords);
      setCurrentDate(formatDateRecentSearch());
    }
  }, [tempRecentKeywordLst, isFetching]);

  const handleScroll = (event: any) => {
    const pageIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth,
    );
    setCurrentPage(pageIndex);
  };

  const handleOnRefresh = async () => {
    await refetch();
    showToast('새로고침되었습니다.');
  };

  return (
    <View>
      <View
        style={tw`w-full border-t-[0.5px] mb-4 border-[${designatedColor.GRAY5}] pb-2`}>
        <View style={tw`flex-row justify-between items-center px-5 py-3`}>
          <CustomText
            style={tw`text-[${designatedColor.VIOLET3}] text-[16px] mr-2 items-center`}>
            실시간 검색어
          </CustomText>

          <TouchableOpacity
            style={tw`p-1 flex-row items-center`}
            activeOpacity={0.9}
            onPress={handleOnRefresh}>
            <CustomText
              style={tw`text-[${designatedColor.GRAY1}] mr-1.5 text-[12px]`}>
              {`${currentDate} 기준`}
            </CustomText>
            <RefreshIcon width={20} height={20} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth}
          decelerationRate="fast"
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={tw`flex-row`}>
          {recentKeywordLst.map((group, groupIndex) => (
            <View
              key={groupIndex}
              style={[tw`items-start mx-4`, {width: screenWidth * 0.9}]}>
              {group.map((keyword, index) => (
                <TouchableOpacity
                  style={tw`flex-row items-center py-1.5`}
                  key={index}
                  activeOpacity={0.9}
                  onPress={() => {
                    onPressRecentKeyword(keyword);
                  }}>
                  <SearchIcon width={20} height={20} style={tw`mr-3`} />
                  <CustomText
                    style={tw`text-left text-[${designatedColor.WHITE}] text-[16px] mb-2`}>
                    {keyword || ''}
                  </CustomText>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={tw`flex-row justify-center mt-2`}>
          {recentKeywordLst.map((_, index) => (
            <View
              key={index}
              style={[
                tw`h-2 w-2 rounded-full mx-1`,
                {
                  backgroundColor:
                    index === currentPage
                      ? designatedColor.VIOLET2
                      : designatedColor.GRAY4,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export {SearchRecentKeyword};

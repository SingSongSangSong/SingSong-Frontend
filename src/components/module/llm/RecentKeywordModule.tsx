import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import CustomText from '../../text/CustomText';
import getRcdRecommendationSearchLog from '../../../api/recommendation/getRcdRecommendationSearchLog';
import {useQuery} from '@tanstack/react-query';
import {useEffect, useState} from 'react';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import CommentVioletIcon from '../../../assets/svg/commentViolet.svg';

type RecentKeywordModuleProps = {
  onPressRecentKeyword: (recentKeyword: string) => void;
};
const RecentKeywordModule = ({
  onPressRecentKeyword,
}: RecentKeywordModuleProps) => {
  const [recentKeywords, setRecentKeywords] = useState<string[]>();
  const {width} = useWindowDimensions();

  const {data: tempSearchLogs} = useQuery({
    queryKey: ['searchLogs'],
    queryFn: getRcdRecommendationSearchLog,
    staleTime: 3600000,
    select: data => data.data.searchTexts,
  });

  useEffect(() => {
    if (tempSearchLogs) {
      // console.log('tempSearchLogs:', tempSearchLogs);
      setRecentKeywords(tempSearchLogs);
    }
  }, [tempSearchLogs]);

  return (
    <View style={tw`flex-1`}>
      <CustomText style={tw`text-[${designatedColor.GRAY3}] ml-2`}>
        최근 검색
      </CustomText>
      <View style={tw`py-2`}>
        {recentKeywords?.map((keyword, index) => (
          <TouchableOpacity
            key={index}
            style={tw`flex-row items-center py-1.5 ml-4`}
            onPress={() => {
              onPressRecentKeyword(keyword);
            }}
            activeOpacity={0.9}>
            <CommentVioletIcon width={20} height={20} />
            <CustomText
              style={[
                tw`text-[${designatedColor.TEXT_WHITE}] text-[15px] pl-1`,
                {
                  width: width * 0.9,
                },
              ]}>
              {keyword}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export {RecentKeywordModule};

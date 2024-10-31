import React from 'react';
import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import {SearchRecentList} from '../..';
import useSearchRecentStore from '../../../store/useSearchRecentStore';
import CustomText from '../../text/CustomText';

interface SearchRecentProps {
  onPressRecent: (searchText: string) => void;
}

const SearchRecent = ({onPressRecent}: SearchRecentProps) => {
  const orderedSearchRecents = useSearchRecentStore(
    state => state.orderedSearchRecents, // 최신 순서로 정렬된 검색 기록을 구독
  );
  const deleteSearchRecent = useSearchRecentStore(
    state => state.deleteSearchRecent,
  );

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      {orderedSearchRecents.length != 0 ? (
        <>
          <SearchRecentList
            recentlistData={orderedSearchRecents}
            onPress={onPressRecent}
            onDeletePress={deleteSearchRecent}
          />
        </>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={tw`flex-1 w-full justify-start pl-6 py-2`}>
            {/* <CustomText
              style={tw`text-[${designatedColor.WHITE}] font-bold text-[14px]`}>
              검색 TIP
            </CustomText>
            <CustomText style={tw`text-[${designatedColor.VIOLET3}] pt-1`}>
              노래 제목 검색 - 예시) Supernova
            </CustomText>
            <CustomText style={tw`text-[${designatedColor.VIOLET3}] pt-1`}>
              가수 이름 검색 - 예시) 에스파
            </CustomText>
            <CustomText style={tw`text-[${designatedColor.VIOLET3}] pt-1`}>
              노래방 번호 검색 - 예시) 86820
            </CustomText> */}
            <View style={tw`flex-1 justify-center items-center`}>
              <CustomText style={tw`text-[${designatedColor.GRAY2}]`}>
                최근 검색이 없습니다
              </CustomText>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export {SearchRecent};

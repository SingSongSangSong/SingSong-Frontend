import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import {KeepSongsV2List} from '../../components';
import tw from 'twrnc';
import {KeepStackParamList} from '../../types';
import {designatedColor, keepStackNavigations} from '../../constants';
import useKeep from '../../hooks/useKeep';
import {logButtonClick, logPageView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomText from '../../components/text/CustomText';
import ArrowBottomIcon from '../../assets/svg/arrowBottom.svg';
import CheckFilled2Icon from '../../assets/svg/CheckFilled2.svg';

type KeepScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP
>;

function KeepScreen(props: KeepScreenProps) {
  const keepHandler = useKeep();

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  const _onSongPress = (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
  ) => {
    logButtonClick('keep_song_button_click');
    amplitude.track('keep_song_button_click');
    props.navigation.push(keepStackNavigations.KEEP_SONG_DETAIL, {
      songId,
      songNumber,
      songName,
      singerName,
      album,
      melonLink,
      isMr,
      isLive,
    });
  };

  const insets = useSafeAreaInsets();

  const showFilter = (filter: string) => {
    switch (filter) {
      case 'alphabet':
        return '가나다순';
      case 'recent':
        return '최신순';
      case 'old':
        return '오래된순';
      default:
        return filter; // 다른 값은 그대로 반환
    }
  };

  return (
    <View
      style={[
        tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`,
        Platform.OS === 'ios' && {
          // paddingBottom: 80,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      <View style={tw`w-full h-full`}>
        {keepHandler.isFetchingKeep ? (
          <View style={tw`flex-1 justify-center items-center`}>
            {/* <ActivityIndicator size="small" color={designatedColor.VIOLET} /> */}
          </View>
        ) : keepHandler.keepError ? (
          <View style={tw`h-full w-full justify-center items-center`}>
            <CustomText style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
              KEEP을 불러오는 중 에러가 발생했어요
            </CustomText>
          </View>
        ) : keepHandler.keepList && keepHandler.keepList.length > 0 ? (
          //KEEP이 에러가 발생하지 않은 경우
          // <View>
          //   {keepHandler.keepList && keepHandler.keepList.length > 0 ? (
          <>
            <View style={tw`flex-row justify-end mx-3 py-3`}>
              <TouchableOpacity
                style={tw`flex-row items-center rounded-lg bg-[${designatedColor.GRAY5}] px-2 py-2`}
                activeOpacity={0.8}
                onPress={keepHandler.handleOnPressFilter}>
                <CustomText style={tw`text-white text-[14px]`}>
                  {showFilter(keepHandler.selectedFilter)}
                </CustomText>
                <View style={tw`ml-2`}>
                  <ArrowBottomIcon width={12} height={12} />
                </View>
              </TouchableOpacity>
            </View>
            <KeepSongsV2List
              songs={keepHandler.keepList}
              handleRefreshKeep={keepHandler.handleDownRefreshKeep}
              onRefresh={keepHandler.onRefresh}
              isLoading={keepHandler.isLoading}
              refreshing={keepHandler.refreshing}
              onSongPress={_onSongPress}
            />
          </>
        ) : keepHandler.isLengthZero ? (
          //   ) : (
          //     <View style={tw`h-full w-full justify-center items-center`}>
          //       <CustomText
          //         style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
          //         KEEP이 비어있어요
          //       </CustomText>
          //     </View>
          //   )}
          // </View>
          <View style={tw`h-full w-full justify-center items-center`}>
            <CustomText style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
              KEEP이 비어있어요
            </CustomText>
          </View>
        ) : (
          <View />
        )}
      </View>
      <Modal
        animationType="fade" // 애니메이션 없이 즉시 사라지도록 설정
        transparent={true}
        visible={keepHandler.isModalVisible}
        onRequestClose={() => keepHandler.setIsModalVisible(false)}>
        {/* 모달 바깥을 클릭하면 닫히도록 설정 */}
        <TouchableWithoutFeedback
          onPress={() => keepHandler.setIsModalVisible(false)}>
          <View style={tw`flex-1 bg-[rgba(0,0,0,0.5)] justify-end`}>
            {/* 모달 안쪽 영역만 따로 터치 가능하도록 분리 */}
            <TouchableWithoutFeedback>
              <View style={tw`bg-black p-6 rounded-t-xl`}>
                {/* 상단 헤더 */}
                <View style={tw`flex-row justify-between items-center`}>
                  <CustomText style={tw`text-white text-lg font-bold`}>
                    정렬 방식
                  </CustomText>
                  {/* <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Text style={tw`text-white text-lg`}>✕</Text>
                  </TouchableOpacity> */}
                </View>

                {/* 정보 */}
                <View style={tw`mt-4`}>
                  {/* <Text style={tw`text-[pink] text-sm`}>11112 김민석</Text> */}
                  <View style={tw`mt-4`}>
                    {keepHandler.filters.map(filter => (
                      <View
                        key={filter}
                        // style={tw`flex-row justify-between mt-2 mx-2`}
                      >
                        <TouchableOpacity
                          onPress={() => {
                            keepHandler.handleOnPressChangeFilter(filter);
                          }}
                          style={tw`flex-row justify-between mt-2 mx-2 p-2`}
                          activeOpacity={0.8}>
                          <CustomText
                            style={[
                              tw`text-sm`,
                              filter === keepHandler.selectedFilter
                                ? tw`text-[${designatedColor.VIOLET2}] font-bold` // userGender가 'FEMALE'이면 핑크색과 굵은 폰트
                                : tw`text-white`, // 그 외에는 기본 흰색
                            ]}>
                            {showFilter(filter)}
                          </CustomText>
                          {filter === keepHandler.selectedFilter ? (
                            <CheckFilled2Icon width={16} height={16} />
                          ) : (
                            // <CheckIcon width={16} height={16} />
                            <></>
                          )}
                        </TouchableOpacity>
                      </View>
                    ))}
                  </View>
                </View>

                {/* 닫기 버튼 */}
                <TouchableOpacity
                  onPress={() => keepHandler.setIsModalVisible(false)}
                  style={tw`py-4 mt-2 border-t-[0.4px] border-[${designatedColor.GRAY5}]`}>
                  <CustomText style={tw`text-center text-white`}>
                    닫기
                  </CustomText>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default KeepScreen;

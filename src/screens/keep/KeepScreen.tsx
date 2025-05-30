import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  View,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import {
  AddTextButton,
  // AiSongCardModule,
  KeepSongsV2List,
} from '../../components';
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
import KeepInfoIcon from '../../assets/svg/keepInfo.svg';

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
    lyricsVideoId: string,
  ) => {
    logButtonClick('keep_song_button_click');
    amplitude.track('keep_song_button_click');
    props.navigation.push(keepStackNavigations.KEEP_SONG_DETAIL, {
      songId: songId,
      songNumber: songNumber,
      songName: songName,
      singerName: singerName,
      album: album || '',
      melonLink: melonLink,
      isMr: isMr,
      isLive: isLive,
      lyricsVideoId: lyricsVideoId || '',
    });
  };

  // const handleOnPressAiTotalButton = () => {
  //   logTrack('ai_recommendation_total_button_click');
  //   props.navigation.navigate(keepStackNavigations.KEEP_AI_RECOMMENDATION);
  //   // console.log('AI 추천 전체보기 버튼 클릭');
  // };

  // const handleOnSongPress = (
  //   songId: number,
  //   songNumber: number,
  //   songName: string,
  //   singerName: string,
  //   album: string,
  //   melonLink: string,
  //   isMr: boolean,
  //   isLive: boolean,
  //   lyricsVideoId: string,
  // ) => {
  //   amplitude.track('preview_song_button_click');
  //   logButtonClick('preview_song_button_click');
  //   props.navigation.navigate({
  //     key: 'MyUniqueKeyForSongDetail',
  //     name: keepStackNavigations.KEEP_SONG_DETAIL,
  //     params: {
  //       songId: songId,
  //       songNumber: songNumber,
  //       songName: songName,
  //       singerName: singerName,
  //       album: album || '',
  //       melonLink: melonLink,
  //       isMr: isMr,
  //       isLive: isLive,
  //       lyricsVideoId: lyricsVideoId || '',
  //     },
  //   });
  // };

  const insets = useSafeAreaInsets();
  const screen = Dimensions.get('window');

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

  const renderHeader = () => {
    return (
      // <AiSongCardModule
      //   onPressTotalButton={handleOnPressAiTotalButton}
      //   onPressSongButton={handleOnSongPress}
      //   refreshing={keepHandler.refreshing}
      //   isShowed={false}
      // />
      <View />
    );
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
            <View style={tw`flex-row justify-between items-center mx-3 py-3`}>
              <AddTextButton
                title="곡 추가"
                onPress={() => {
                  props.navigation.navigate(
                    keepStackNavigations.KEEP_SONG_ADDITION,
                  );
                }}
                isCenter={true}
              />
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
              renderHeader={renderHeader}
            />
          </>
        ) : keepHandler.keepList &&
          keepHandler.keepList.length == 0 &&
          keepHandler.isLengthZero ? (
          //   ) : (
          //     <View style={tw`h-full w-full justify-center items-center`}>
          //       <CustomText
          //         style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
          //         KEEP이 비어있어요
          //       </CustomText>
          //     </View>
          //   )}
          // </View>
          <View style={tw`flex-1 h-full w-full items-center justify-center`}>
            {/* <AiSongCardModule
              onPressTotalButton={handleOnPressAiTotalButton}
              onPressSongButton={handleOnSongPress}
              refreshing={keepHandler.refreshing}
              isShowed={true}
            /> */}
            <View style={tw`w-full items-center justify-center`}>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET2}] font-bold text-[18px] py-2`}>
                보관함이 비어있어요
              </CustomText>
              <CustomText style={tw`text-[${designatedColor.GRAY1}] font-bold`}>
                정확한 추천을 할 수 있도록 보관함에 노래를 추가해주세요
              </CustomText>
              <KeepInfoIcon
                width={screen.width * 0.9}
                height={screen.height * 0.2}
              />
              <TouchableOpacity
                style={tw`w-3/5 py-3 rounded-full bg-[${designatedColor.VIOLET}] justify-center items-center`}
                onPress={() => {
                  props.navigation.navigate(
                    keepStackNavigations.KEEP_SONG_ADDITION,
                  );
                }}
                activeOpacity={0.9}>
                <CustomText
                  style={tw`text-[${designatedColor.WHITE}] font-bold text-[16px]`}>
                  곡 추가하기
                </CustomText>
              </TouchableOpacity>
            </View>
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

import React, {useEffect, useState} from 'react';
import {
  AppState,
  Dimensions,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import {CommonTag} from '../../tag/CommonTag';
import CustomText from '../../text/CustomText';
import {CustomModal} from '../..';
import WhiteLogoIcon from '../../../assets/svg/whiteLogo.svg';
import {SongInfo} from '../../../types';
import useCommentStore from '../../../store/useCommentStore';
import useKeepV2Store from '../../../store/useKeepV2Store';
import {logButtonClick, logTrack, showToast} from '../../../utils';
import MelonIcon from '../../../assets/svg/melon.svg';
import TjIcon from '../../../assets/svg/tj.svg';
import KeepCountIcon from '../../../assets/svg/keepGray.svg';
import CommentCountIcon from '../../../assets/svg/commentGray.svg';
import OutlineKeepIcon from '../../../assets/svg/outlineKeep.svg';
import KeepFilledIcon from '../../../assets/svg/keepFilledIcon.svg';
import KeepIcon from '../../../assets/svg/keepIcon.svg';
import YoutubePlayer from 'react-native-youtube-iframe';
import RecordIcon from '../../../assets/svg/record.svg';
import {deleteKeep, getKeepV2, postKeep} from '../../../api/keep-api';
import {getSongs} from '../../../api/song-api';

type SongInfo2Props = {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string;
  melonLink: string;
  isMr: boolean;
  isLive?: boolean;
  lyricsVideoId: string;
  handleOnPressComment: (songNumber: number, songId: number) => void;
};
const SongInfo2 = ({
  songId,
  songNumber,
  songName,
  singerName,
  album,
  melonLink,
  isMr,
  isLive = false,
  lyricsVideoId,
  handleOnPressComment,
}: SongInfo2Props) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [songInfo, setSongInfo] = useState<SongInfo>();
  // const setKeepList = useKeepListStore(state => state.setKeepList);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const commentCount = useCommentStore(state => state.commentCount);
  const setCommentCount = useCommentStore(state => state.setCommentCount);
  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);
  const deviceWidth = Dimensions.get('window').width;
  const youtubeAspectRatio = 9 / 16; // 16:9 aspect ratio
  const videoHeight = deviceWidth * youtubeAspectRatio; // height based on aspect ratio
  const [playing, setPlaying] = useState<boolean>(false);
  const [appState, setAppState] = useState<string>(AppState.currentState);
  const [currentYoutubeVideoId, setCurrentYoutubeVideoId] =
    useState<string>(lyricsVideoId);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        setPlaying(false);
      } else if (nextAppState === 'active') {
        setPlaying(false);
      }
      setAppState(nextAppState);
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const setInitSongAdditionInfo = async (songId: number) => {
    // console.log('setInitSongAdditionInfo');
    try {
      const tempSongInfo = await getSongs(String(songId));
      setSongInfo(tempSongInfo.data);
      if (tempSongInfo.data.lyricsVideoId !== '' && lyricsVideoId == '') {
        setCurrentYoutubeVideoId(tempSongInfo.data.lyricsVideoId!);
      }

      // const hasLyricsLink = tempSongInfo.data.lyricsVideoId !== '';
      // const hasTJLink = tempSongInfo.data.tjVideoId !== '';

      // if (hasLyricsLink && hasTJLink) {
      //   setCurrentYoutubeVideoName('가사'); // 기본적으로 가사로 설정
      //   setCurrentYoutubeVideoId(tempSongInfo.data.lyricsVideoId);
      //   setIsToggleEnabled(true); // 둘 다 있을 경우 토글 활성화
      // } else if (hasLyricsLink) {
      //   setCurrentYoutubeVideoName('가사');
      //   setIsToggleEnabled(false); // 하나만 있을 경우 토글 비활성화
      // } else if (hasTJLink) {
      //   setCurrentYoutubeVideoName('TJ');
      //   setIsToggleEnabled(false); // 하나만 있을 경우 토글 비활성화
      // } else {
      //   setCurrentYoutubeVideoName('album');
      //   setIsToggleEnabled(false); // 둘 다 없을 경우 토글 비활성화
      // }

      setCommentCount(tempSongInfo.data.commentCount);
    } catch (error) {
      console.error('Error fetching song addition info:', error);
    } finally {
      setLoading(false); // 로딩 완료 후 로딩 상태 업데이트
    }
  };

  const handleOnPressKeep = () => {
    logTrack('song_keep_button_click');
    logButtonClick('song_keep_button_click');

    if (songInfo && songInfo.isKeep) {
      setSongInfo({
        ...songInfo!,
        isKeep: false,
        keepCount: songInfo!.keepCount - 1,
      });
      // deleteKeep([songId]).then(tempData => {
      //   setKeepList(tempData.data);
      // });
      deleteKeep([songId])
        .then(() => getKeepV2(selectedFilter, -1, 20)) // deleteKeep 후 getKeep 호출
        .then(tempData => {
          setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
          setLastCursor(tempData.data.lastCursor);
          setIsEnded(false);
        })
        .catch(error => {
          console.error('Error updating keep list:', error);
        });
      showToast('보관함에서 삭제되었습니다.');
    } else if (songInfo && !songInfo.isKeep) {
      setSongInfo({
        ...songInfo!,
        isKeep: true,
        keepCount: songInfo!.keepCount + 1,
      });

      postKeep([songId])
        .then(() => getKeepV2(selectedFilter, -1, 20)) // postKeep 후 getKeep 호출
        .then(tempData => {
          setKeepList(tempData.data.songs); // getKeep 결과로 상태 업데이트
          setLastCursor(tempData.data.lastCursor);
          setIsEnded(false);
        })
        .catch(error => {
          console.error('Error updating keep list:', error);
        });
      showToast('보관함에 추가되었습니다.');
    }
  };

  useEffect(() => {
    setInitSongAdditionInfo(songId);
  }, []);

  const _handleOnPressComment = () => {
    if (songNumber == 0) {
      if (songInfo && songInfo.songNumber) {
        handleOnPressComment(songInfo.songNumber, songId);
      } else {
        showToast('잠시 후 다시 시도해주세요.');
      }
    } else {
      handleOnPressComment(songNumber, songId);
    }
    handleOnPressComment(songNumber, songId);
  };

  // const handleOnToggleSwitch = () => {
  //   if (isToggleEnabled) {
  //     // 토글이 활성화된 경우에만 작동
  //     setCurrentYoutubeVideoId(prev => (prev === '가사' ? 'TJ' : '가사'));
  //   } else {
  //     showToast(`현재 곡은 ${currentYoutubeVideoId} 유튜브만 제공합니다.`);
  //   }
  // };
  return (
    <View>
      <View style={tw`justify-center items-center overflow-hidden`}>
        <View style={{height: videoHeight}}>
          {songInfo && (
            <>
              {songInfo.lyricsVideoId!.length > 0 ? (
                <YoutubePlayer
                  width={deviceWidth}
                  height={videoHeight}
                  play={playing}
                  videoId={currentYoutubeVideoId}
                  onChangeState={() => {}}
                />
              ) : album != '' ? (
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(true);
                  }}
                  style={tw`mt-5 rounded-lg justify-center items-center`}
                  activeOpacity={1.0}>
                  <Image
                    source={{uri: album}}
                    style={tw`w-50 h-50 rounded-md`}
                    resizeMode="cover" // 이미지가 크기에 맞게 잘리도록 조정
                  />
                </TouchableOpacity>
              ) : (
                <View
                  style={tw`mt-5 w-50 h-50 bg-[${designatedColor.BLACK}] rounded-lg justify-center items-center border border-[${designatedColor.GRAY4}]`}>
                  <WhiteLogoIcon width={108} height={76} />
                </View>
              )}
              <View />
            </>
          )}
        </View>
      </View>
      {/* <View style={tw`flex-row justify-end py-3 pr-4 items-center`}>
        <ToggleButton toggleSwitch={handleOnToggleSwitch} />
        <CustomText
          style={tw`text-[16px] text-[${designatedColor.WHITE}] pl-2`}>
          {currentYoutubeVideoId}
        </CustomText>
      </View> */}
      <View style={tw`px-3 pt-3`}>
        <View style={tw`justify-between flex-row mx-1`}>
          <View style={tw`flex-1 flex-row items-center`}>
            <View style={tw`items-center`}>
              {isMr && <CommonTag name="MR" color={designatedColor.PURPLE} />}
            </View>
            <View style={tw`items-center`}>
              {isLive && (
                <CommonTag name="LIVE" color={designatedColor.ORANGE} />
              )}
            </View>

            <CustomText
              style={tw`flex-1 text-white text-2xl font-bold`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {songName}
            </CustomText>
          </View>

          {/* <TouchableOpacity
            style={tw` flex-row items-center rounded-full py-1.5 px-3 mx-1 border border-[${designatedColor.VIOLET2}] bg-[${designatedColor.BLACK}]`}
            activeOpacity={0.8}
            onPress={() => {
              logTrack('song_tj_button_click');
              if (songInfo && songInfo.tjYoutubeLink) {
                Linking.openURL(songInfo.tjYoutubeLink);
              } else {
                showToast('곧 업데이트 될 예정입니다.');
              }
            }}>
            <RecordIcon width={22} height={22} />

            <CustomText
              style={tw`text-[${designatedColor.VIOLET2}] text-[12px] pl-1`}>
              녹음하기
            </CustomText>
          </TouchableOpacity> */}
        </View>

        <View style={tw`flex-row items-center mt-2`}>
          <View style={tw`items-center justify-center`}>
            <CustomText style={tw`text-white text-[${designatedColor.VIOLET}]`}>
              {songInfo?.songNumber}
            </CustomText>
          </View>
          <CustomText
            style={tw`text-white mx-2`}
            numberOfLines={1}
            ellipsizeMode="tail">
            {singerName}
          </CustomText>
        </View>
      </View>
      {album && album != '' && melonLink && (
        <CustomModal
          visible={isModalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}
          message="해당 노래에 대한 가사를 볼 수 있는 외부 링크로 이동하게 됩니다. 이동하시겠습니까?"
          onConfirm={() => {
            Linking.openURL(melonLink);
          }}
          onCancel={() => {
            setIsModalVisible(false);
          }}
          confirmText="확인"
          cancelText="취소"
        />
      )}
      <View style={tw`border-b-[0.5px] border-[${designatedColor.GRAY5}]`}>
        <View style={tw`flex-row items-center justify-between px-3 py-2`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`flex-row mr-2 items-center`}>
              {!songInfo || !songInfo.isKeep ? (
                <KeepCountIcon width={18} height={18} />
              ) : (
                <OutlineKeepIcon width={18} height={18} />
              )}
              <CustomText style={tw`text-[${designatedColor.GRAY1}] ml-1`}>
                {!songInfo ? <>0</> : <>{songInfo.keepCount}</>}
              </CustomText>
            </View>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={_handleOnPressComment}
              activeOpacity={0.8}>
              <CommentCountIcon width={18} height={18} />
              <CustomText style={tw`text-[${designatedColor.GRAY1}] ml-1`}>
                {commentCount}
              </CustomText>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center mr-2`}>
            <CustomText style={tw`text-white text-[3] mr-2`}>
              최고 음역대{' '}
            </CustomText>
            {songInfo &&
              (songInfo.octave == '' ? (
                <CustomText
                  style={tw`text-[3] text-[${designatedColor.DARK_GRAY}]`}>
                  없음
                </CustomText>
              ) : (
                <CustomText
                  style={tw`text-[3] text-[${designatedColor.GREEN}]`}>
                  {songInfo.octave}
                </CustomText>
              ))}
          </View>

          {/* <View style={tw`m-1`}>
          {songInfo && songInfo.description != '' ? (
            <Text style={tw`text-[${designatedColor.PINK2}]`}>
              {songInfo.description}
            </Text>
          ) : (
            <Text>''</Text>
          )}
        </View> */}
        </View>
        <View style={tw`flex-row justify-between px-3 pb-3 pt-5 items-center`}>
          <View style={tw`flex-row items-center`}>
            <TouchableOpacity
              style={tw` flex-row items-center rounded-full py-1.5 px-3 mx-1 border border-[${designatedColor.TJORANGE}] bg-[${designatedColor.BLACK}]`}
              activeOpacity={0.8}
              onPress={() => {
                logTrack('song_tj_button_click');
                if (songInfo && songInfo.tjYoutubeLink) {
                  Linking.openURL(songInfo.tjYoutubeLink);
                } else {
                  showToast('곧 업데이트 될 예정입니다.');
                }
              }}>
              <TjIcon width={22} height={22} />

              <CustomText
                style={tw`text-[${designatedColor.TJORANGE}] text-[12px] pl-1`}>
                TJ
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={tw` flex-row items-center rounded-full py-1.5 px-3 mx-1 border border-[${designatedColor.GRAY1}] bg-[${designatedColor.BLACK}]`}
              activeOpacity={0.8}
              onPress={() => {
                logTrack('song_youtube_button_click');
                if (songInfo && songInfo.album && songInfo.melonLink) {
                  Linking.openURL(songInfo.melonLink);
                } else {
                  showToast('곧 업데이트 될 예정입니다.');
                }
              }}>
              <MelonIcon width={22} height={22} />

              <CustomText
                style={tw`text-[${designatedColor.TEXT_WHITE}] text-[12px] pl-1`}>
                Melon
              </CustomText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleOnPressKeep} style={tw`p-2 pr-4`}>
            {!songInfo || !songInfo.isKeep ? (
              <KeepIcon width={24} height={24} />
            ) : (
              <KeepFilledIcon width={24} height={24} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export {SongInfo2};

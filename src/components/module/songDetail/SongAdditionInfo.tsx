import React, {useEffect, useState} from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import {SongInfo} from '../../../types';
import getSongs from '../../../api/songs/getSongs';
import KeepCountIcon from '../../../assets/svg/keepGray.svg';
import CommentCountIcon from '../../../assets/svg/commentGray.svg';
// import useKeepListStore from '../../../store/useKeepStore';
import deleteKeep from '../../../api/keep/deleteKeep';
import postKeep from '../../../api/keep/postKeep';
import KeepFilledIcon from '../../../assets/svg/keepFilledIcon.svg';
import KeepIcon from '../../../assets/svg/keepIcon.svg';
import OutlineKeepIcon from '../../../assets/svg/outlineKeep.svg';
import useCommentStore from '../../../store/useCommentStore';
import Toast from 'react-native-toast-message';
import {logButtonClick, logTrack, showToast} from '../../../utils';
import * as amplitude from '@amplitude/analytics-react-native';
import CustomText from '../../text/CustomText';
import useKeepV2Store from '../../../store/useKeepV2Store';
import getKeepV2 from '../../../api/keep/getKeepV2';
import YoutubeIcon from '../../../assets/svg/youtube.svg';
import TjIcon from '../../../assets/svg/tj.svg';

type SongAdditionInfoProps = {
  songId: number;
  handleOnPressComment: () => void;
};

const SongAdditionInfo = ({
  songId,
  handleOnPressComment,
}: SongAdditionInfoProps) => {
  const [songInfo, setSongInfo] = useState<SongInfo>();
  // const setKeepList = useKeepListStore(state => state.setKeepList);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const commentCount = useCommentStore(state => state.commentCount);
  const setCommentCount = useCommentStore(state => state.setCommentCount);
  const setKeepList = useKeepV2Store(state => state.setKeepList);
  const setLastCursor = useKeepV2Store(state => state.setLastCursor);
  const setIsEnded = useKeepV2Store(state => state.setIsEnded);
  const selectedFilter = useKeepV2Store(state => state.selectedFilter);

  const setInitSongAdditionInfo = async (songId: number) => {
    // console.log('setInitSongAdditionInfo');
    try {
      const tempSongInfo = await getSongs(String(songId));
      setSongInfo(tempSongInfo.data);
      setCommentCount(tempSongInfo.data.commentCount);
    } catch (error) {
      console.error('Error fetching song addition info:', error);
    } finally {
      setLoading(false); // 로딩 완료 후 로딩 상태 업데이트
    }
  };

  const handleOnPressKeep = () => {
    amplitude.track('song_keep_button_click');
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

      Toast.show({
        type: 'selectedToast',
        text1: '보관함에서 삭제되었습니다.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
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
      Toast.show({
        type: 'selectedToast',
        text1: '보관함에 추가되었습니다.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
    }
  };

  useEffect(() => {
    setInitSongAdditionInfo(songId);
  }, []);

  return (
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
            onPress={handleOnPressComment}
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
              <CustomText style={tw`text-[3] text-[${designatedColor.GREEN}]`}>
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
            style={tw` flex-row items-center rounded-full py-0.5 px-2 mx-1 border border-[${designatedColor.TJORANGE}] bg-[${designatedColor.BLACK}]`}
            activeOpacity={0.8}
            onPress={() => {
              logTrack('song_tj_button_click');
              if (songInfo && songInfo.tjYoutubeLink) {
                Linking.openURL(songInfo.tjYoutubeLink);
              } else {
                showToast('곧 업데이트 될 예정입니다.');
              }
            }}>
            <TjIcon width={28} height={28} />

            <CustomText
              style={tw`text-[${designatedColor.TJORANGE}] text-[12px] pr-1`}>
              TJ
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw` flex-row items-center rounded-full py-1 px-3 mx-1 border border-[${designatedColor.GRAY1}] bg-[${designatedColor.BLACK}]`}
            activeOpacity={0.8}
            onPress={() => {
              logTrack('song_youtube_button_click');
              if (songInfo && songInfo.lyricsYoutubeLink) {
                Linking.openURL(songInfo.lyricsYoutubeLink);
              } else {
                showToast('곧 업데이트 될 예정입니다.');
              }
            }}>
            <YoutubeIcon width={24} height={24} />

            <CustomText
              style={tw`text-[${designatedColor.TEXT_WHITE}] text-[12px] pl-1`}>
              Youtube
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
  );
};

export {SongAdditionInfo};

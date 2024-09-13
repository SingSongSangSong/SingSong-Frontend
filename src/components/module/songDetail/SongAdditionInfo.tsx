import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import {SongInfo} from '../../../types';
import getSongs from '../../../api/songs/getSongs';
import KeepCountIcon from '../../../assets/svg/keepGray.svg';
import CommentCountIcon from '../../../assets/svg/commentGray.svg';
import useKeepListStore from '../../../store/useKeepStore';
import deleteKeep from '../../../api/keep/deleteKeep';
import postKeep from '../../../api/keep/postKeep';
import KeepFilledIcon from '../../../assets/svg/keepFilledIcon.svg';
import KeepIcon from '../../../assets/svg/keepIcon.svg';
import OutlineKeepIcon from '../../../assets/svg/outlineKeep.svg';
import useCommentStore from '../../../store/useCommentStore';
import Toast from 'react-native-toast-message';
import {logButtonClick} from '../../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type SongAdditionInfoProps = {
  songId: number;
  handleOnPressComment: () => void;
};

const SongAdditionInfo = ({
  songId,
  handleOnPressComment,
}: SongAdditionInfoProps) => {
  const [songInfo, setSongInfo] = useState<SongInfo>();
  const setKeepList = useKeepListStore(state => state.setKeepList);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const commentCount = useCommentStore(state => state.commentCount);
  const setCommentCount = useCommentStore(state => state.setCommentCount);

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
    if (songInfo!.isKeep) {
      setSongInfo({
        ...songInfo!,
        isKeep: false,
        keepCount: songInfo!.keepCount - 1,
      });
      deleteKeep([songId]).then(tempData => {
        setKeepList(tempData.data);
      });
      Toast.show({
        type: 'selectedToast',
        text1: 'KEEP에서 삭제되었습니다.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
    } else {
      setSongInfo({
        ...songInfo!,
        isKeep: true,
        keepCount: songInfo!.keepCount + 1,
      });

      postKeep([songId]).then(tempData => {
        setKeepList(tempData.data);
      });
      Toast.show({
        type: 'selectedToast',
        text1: 'KEEP에 추가되었습니다.',
        position: 'bottom', // 토스트 메시지가 화면 아래에 뜨도록 설정
        visibilityTime: 2000, // 토스트가 표시될 시간 (밀리초 단위, 2초로 설정)
      });
    }
  };

  useEffect(() => {
    setInitSongAdditionInfo(songId);
  }, []);

  return (
    <View style={tw` border-b-[0.5px] border-[${designatedColor.GRAY5}]`}>
      <View style={tw`flex-row items-center justify-between mx-2`}>
        <View>
          <View style={tw`flex-row py-2 mx-1`}>
            <View style={tw`flex-row mr-4 items-center`}>
              {!songInfo || !songInfo.isKeep ? (
                <KeepCountIcon width={18} height={18} />
              ) : (
                <OutlineKeepIcon width={18} height={18} />
              )}
              <Text style={tw`text-[${designatedColor.GRAY1}] ml-1`}>
                {!songInfo ? <>0</> : <>{songInfo.keepCount}</>}
              </Text>
            </View>
            <TouchableOpacity
              style={tw`flex-row items-center`}
              onPress={handleOnPressComment}
              activeOpacity={0.8}>
              <CommentCountIcon width={18} height={18} />
              <Text style={tw`text-[${designatedColor.GRAY1}] ml-1`}>
                {commentCount}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={tw`flex-row items-center py-1 pb-4`}>
            <Text style={tw`text-white text-[3] mr-2`}>최고 음역대 </Text>
            {songInfo &&
              (songInfo.octave == '' ? (
                <Text style={tw`text-[3] text-[${designatedColor.DARK_GRAY}]`}>
                  없음
                </Text>
              ) : (
                <Text style={tw`text-[3] text-[${designatedColor.GREEN}]`}>
                  {songInfo.octave}
                </Text>
              ))}
          </View>
        </View>
        <TouchableOpacity onPress={handleOnPressKeep} style={tw`p-2 pr-4`}>
          {!songInfo || !songInfo.isKeep ? (
            <KeepIcon width={24} height={24} />
          ) : (
            <KeepFilledIcon width={24} height={24} />
          )}
        </TouchableOpacity>
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
    </View>
  );
};

export {SongAdditionInfo};

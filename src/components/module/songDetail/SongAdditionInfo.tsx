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

type SongAdditionInfoProps = {
  songId: number;
};
const SongAdditionInfo = ({songId}: SongAdditionInfoProps) => {
  const [songInfo, setSongInfo] = useState<SongInfo>();
  const setKeepList = useKeepListStore(state => state.setKeepList);

  const setInitSongAdditionInfo = (songId: number) => {
    getSongs(String(songId)).then(tempSongInfo => {
      setSongInfo(tempSongInfo.data);
    });
  };

  const handleOnPressKeep = () => {
    if (songInfo!.isKeep) {
      setSongInfo({
        ...songInfo!,
        isKeep: false,
        keepCount: songInfo!.keepCount - 1,
      });
      deleteKeep([songId]).then(tempData => {
        setKeepList(tempData.data);
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
    }
  };

  useEffect(() => {
    setInitSongAdditionInfo(songId);
  }, []);

  return (
    <View>
      {songInfo ? (
        <View style={tw`mx-2`}>
          <View style={tw`flex-row py-2 mx-1`}>
            <View style={tw`flex-row mr-4 items-center`}>
              {songInfo.isKeep ? (
                <OutlineKeepIcon width={18} height={18} />
              ) : (
                <KeepCountIcon width={18} height={18} />
              )}
              <Text style={tw`text-[${designatedColor.GRAY1}] ml-1`}>
                {songInfo.keepCount}
              </Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <CommentCountIcon width={18} height={18} />
              <Text style={tw`text-[${designatedColor.GRAY1}] ml-1`}>
                {songInfo.commentCount}
              </Text>
            </View>
          </View>
          <View style={tw`flex-row items-center py-1`}>
            <Text style={tw`text-white mr-2`}>최고 음역대 </Text>
            {songInfo.octave == '' ? (
              <Text style={tw`text-[${designatedColor.DARK_GRAY}]`}>없음</Text>
            ) : (
              <Text style={tw`text-[${designatedColor.GREEN}]`}>
                {songInfo.octave}
              </Text>
            )}
          </View>
          <View style={tw`m-1`}>
            {songInfo.description && songInfo.description != '' ? (
              <Text style={tw`text-[${designatedColor.PINK2}]`}>
                {songInfo.description}
              </Text>
            ) : (
              <Text>''</Text>
            )}
          </View>

          <View style={tw`py-2 border-b border-[${designatedColor.GRAY4}]`}>
            <TouchableOpacity onPress={handleOnPressKeep} style={tw`p-2`}>
              {songInfo.isKeep ? (
                <KeepFilledIcon width={24} height={24} />
              ) : (
                <KeepIcon width={24} height={24} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={tw`w-full h-30`} />
      )}
    </View>
  );
};

export {SongAdditionInfo};

import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../../constants';
import CustomText from '../../text/CustomText';
import {PostInSongsList} from '../..';
import usePostSongStore from '../../../store/usePostSongStore';
import PlusIcon from '../../../assets/svg/plusViolet.svg';

interface PostSongListModuleProps {
  onPressSongAddition: () => void;
}

const PostSongListModule = ({onPressSongAddition}: PostSongListModuleProps) => {
  const postSong = usePostSongStore(state => state.postSong);
  const removeAllPostSong = usePostSongStore(state => state.removeAllPostSong);

  const handleOnPressTotalRemove = () => {
    removeAllPostSong();
  };

  return (
    <View style={tw`w-full justify-center items-center`}>
      {postSong.length != 0 && (
        <View style={tw`w-full mb-8`}>
          <View
            style={tw`w-full flex-row items-center justify-between pb-2 mb-2 bg-[${designatedColor.GRAY5}] bg-opacity-50 py-2 px-2 rounded-lg`}>
            <CustomText style={tw`text-[${designatedColor.WHITE}]`}>
              플레이리스트
            </CustomText>
            <TouchableOpacity
              style={tw`px-3 py-2 rounded-full border-[0.5px] border-[${designatedColor.GRAY1}]`}
              onPress={handleOnPressTotalRemove}>
              <CustomText
                style={tw`text-[${designatedColor.WHITE}] text-[10px]`}>
                전체 삭제
              </CustomText>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity onPress={onPressSongAddition} activeOpacity={0.9}>
              <View style={tw`flex-row items-center py-2`}>
                <PlusIcon width={20} height={20} />
                <CustomText
                  style={tw`text-[${designatedColor.VIOLET3}] text-[15px]`}>
                  곡 추가
                </CustomText>
              </View>
            </TouchableOpacity>
          </View>
          <PostInSongsList songData={postSong} />
        </View>
      )}
    </View>
  );
};

export {PostSongListModule};

import React from 'react';
import {View} from 'react-native';
import {Song} from '../../types';
import {PostInSongItem} from '..';
import tw from 'twrnc';

interface PostInSongsListProps {
  songData: Song[];
}

const PostInSongsList = ({songData}: PostInSongsListProps) => {
  return (
    <View style={tw`flex-1 w-full`}>
      {songData.map((item, index) => (
        <PostInSongItem
          key={item.songId || index} // 고유 식별자로 key 설정
          song={item}
          songId={item.songId}
          songNumber={item.songNumber}
          songName={item.songName}
          singerName={item.singerName}
          album={item.album}
          melonLink={item.melonLink || ''}
          isMr={item.isMr}
          isLive={item.isLive || false}
        />
      ))}
    </View>
  );
};

export {PostInSongsList};

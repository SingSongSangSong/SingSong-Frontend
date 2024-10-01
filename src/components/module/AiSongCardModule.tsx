import React, {useEffect} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import getRcdRecommendation from '../../api/recommendation/getRcdRecommendation';
import {AiSongCardList} from '..';
import useSongStore from '../../store/useSongStore';
import {designatedColor} from '../../constants';

interface AiSongCardModuleProps {
  onPressTotalButton: () => void;
  onPressSongButton: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
  ) => void;
}

const AiSongCardModule = ({
  onPressTotalButton,
  onPressSongButton,
}: AiSongCardModuleProps) => {
  const setLoadingVisible = useSongStore(state => state.setLoadingVisible);
  const {
    data: tempRcdRecommendationSongs,
    error: rcdRecommendationError,
    isFetching: isFetchingRcdRecommentdationSongs,
  } = useQuery({
    queryKey: ['rcdRecommendationSongs'],
    queryFn: () => getRcdRecommendation(1),
    staleTime: 3600000,
    select: data => data.data.songs,
  });

  useEffect(() => {
    if (tempRcdRecommendationSongs || rcdRecommendationError) {
      // console.log('tempRcdHomeSongs:', tempRcdHomeSongs);
      // tempRcdHomeSongs.forEach((songWithTags: RcdHomeSongWithTags) => {
      //   setPreviewSongs(songWithTags.tag, songWithTags.songs);
      // });
      // console.log('setPreview Song completed!!!!!!!!!!!');
      setLoadingVisible(false);
    }
  }, [tempRcdRecommendationSongs, rcdRecommendationError]);

  return (
    <View>
      {tempRcdRecommendationSongs ? (
        <View
          style={tw`w-full flex-wrap flex-row justify-center items-center border-t-[0.5px] border-[${designatedColor.GRAY5}]`}>
          <View key="aiSong">
            <AiSongCardList
              tag="AI's PICK"
              onPress={onPressTotalButton}
              data={tempRcdRecommendationSongs}
              onSongPress={onPressSongButton}
            />
          </View>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

export {AiSongCardModule};

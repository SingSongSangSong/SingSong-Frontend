import React from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import getRcdRecommendation from '../../api/recommendation/getRcdRecommendation';
import {AiSongCardList} from '..';

interface AiSongCardModuleProps {
  onPressTotalButton: () => void;
  onPressSongButton: (
    songNumber: number,
    songId: number,
    songName: string,
    singerName: string,
    album: string,
    isMr: boolean,
  ) => void;
}

const AiSongCardModule = ({
  onPressTotalButton,
  onPressSongButton,
}: AiSongCardModuleProps) => {
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

  return (
    <View>
      {tempRcdRecommendationSongs ? (
        <View style={tw`w-full flex-wrap flex-row justify-center items-center`}>
          <View key="aiSong">
            <AiSongCardList
              tag="AI가 골랐송"
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

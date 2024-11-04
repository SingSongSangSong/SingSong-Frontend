import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {useQuery} from '@tanstack/react-query';
import getRcdRecommendation from '../../../api/recommendation/getRcdRecommendation';
import {Song} from '../../../types';
import {SearchAiSongsList} from '../..';

const SearchAiSong = () => {
  const [searchAiSongsList, setSearchAiSongsList] = useState<Song[]>();
  const {
    data: tempAiSongs,
    error: aiSongsError,
    isFetching: isFetchingAiSongs,
  } = useQuery({
    queryKey: ['keepAdditionAiSongs'],
    queryFn: () => getRcdRecommendation(1),
    staleTime: 3600000,
    select: data => data.data,
  });
  useEffect(() => {
    if (tempAiSongs) {
      setSearchAiSongsList(tempAiSongs.songs);
    }
  }, [tempAiSongs]);

  return (
    <View style={tw`flex-1 w-full justify-center items-center`}>
      {searchAiSongsList && <SearchAiSongsList songData={searchAiSongsList} />}
    </View>
  );
};

export {SearchAiSong};

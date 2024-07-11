import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import tw from 'twrnc';
import useRecommendStore from '../../store/useRecommendStore';
import CustomSongCard from '../../components/CustomSongCard';
import FolderIcon from '../../../public/folder.svg';
import PlusIcon from '../../../public/plus.svg';
import usePlaylistStore from '../../store/usePlaylistStore';
import useSonglistStore from '../../store/useSonglistStore';
import uuid from 'react-native-uuid';
import CustomMsgBox from '../../components/CustomMsgBox';
type FolderItem = {
  id: string;
};

const folders: FolderItem[] = new Array(10).fill(null).map((_, index) => ({
  id: index.toString(),
}));

function RcdKeepScreen() {
  const {storedSong, setStoredSong} = useRecommendStore();
  const {playlist, setPlaylist} = usePlaylistStore();
  const {songlist, setSonglist} = useSonglistStore();
  const [modalVisible, setModalVisible] = useState(false);

  const handleStoredPlaylist = () => {
    const id = String(uuid.v4());
    const shortId = id.slice(-7);
    const songCount = String(storedSong ? Object.keys(storedSong).length : 0);
    setPlaylist(id, `recommendation_result_${shortId}`, songCount);
    if (storedSong) {
      setSonglist(id, storedSong); //songid와 song객체 묶음
      setModalVisible(true);
    }
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={tw`w-full h-full bg-gray-900`}>
      <SafeAreaView style={tw`flex-1 border-b border-white`}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          // contentContainerStyle={tw`p-4`}
          style={tw`w-full h-full`}>
          {folders.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => console.log('폴더 클릭', item.id)}>
              <View style={tw`m-2`}>
                <FolderIcon width={64} height={64} />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
      <View style={tw`h-[80%] p-1`}>
        <Text style={tw`text-white text-lg pb-2 font-bold`}>
          2024년 7월 11일
        </Text>
        {storedSong && Object.keys(storedSong).length > 0 ? (
          <ScrollView
            contentContainerStyle={tw`flex-wrap flex-row`}
            style={tw`w-full h-full`}>
            {Object.keys(storedSong).map(key => {
              const song = storedSong[Number(key)];
              return (
                <CustomSongCard
                  key={key}
                  songName={song.song_name}
                  singerName={song.singer_name}
                  tags={song.tags}
                />
              );
            })}
          </ScrollView>
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-white`}>저장한 노래가 없어요</Text>
          </View>
        )}
      </View>
      <View style={tw`flex-row justify-center m-3`}>
        <TouchableOpacity
          style={tw`p-2 flex-row justify-centeer items-center`}
          onPress={() => handleStoredPlaylist()}>
          <PlusIcon width={16} height={16} />
          <Text style={tw`text-white font-bold text-sm ml-2`}>
            플레이리스트에 추가
          </Text>
        </TouchableOpacity>
        <CustomMsgBox
          visible={modalVisible}
          message="플레이리스트에 추가되었습니다."
          onClose={handleCloseModal}
        />
      </View>
    </SafeAreaView>
  );
}

export default RcdKeepScreen;

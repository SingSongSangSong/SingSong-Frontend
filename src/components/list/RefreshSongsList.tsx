import React, {memo} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import tw from 'twrnc';
import {SongItem} from '..';
import {Song} from '../../types';
import {designatedColor} from '../../constants';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import Modal from 'react-native-modal';

interface RefreshSongsListProps {
  songlistData: Song[];
  isShowKeepIcon: boolean | undefined;
  onSongPress: (
    songId: number,
    songNumber: number,
    songName: string,
    singerName: string,
    album: string,
    melonLink: string,
    isMr: boolean,
    isLive: boolean,
  ) => void;
  onKeepAddPress: (songId: number) => void;
  onKeepRemovePress: (songId: number) => void;
  handleRefreshSongs: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  refreshing: boolean;
}

// 메모이제이션된 renderItem 함수
const RenderItem = memo(
  ({
    item,
    onSongPress,
    onKeepAddPress,
    onKeepRemovePress,
    isShowKeepIcon,
  }: // setIsModalVisible,
  any) => (
    <SongItem
      key={item.songNumber}
      songId={item.songId}
      songNumber={item.songNumber}
      songName={item.songName}
      singerName={item.singerName}
      album={item.album}
      melonLink={item.melonLink}
      isKeep={item.isKeep}
      isShowKeepIcon={isShowKeepIcon}
      isMr={item.isMr}
      isLive={item.isLive}
      keepCount={item.keepCount}
      commentCount={item.commentCount}
      isRecentlyUpdated={item.isRecentlyUpdated}
      // setIsModalVisible={setIsModalVisible}
      onSongPress={() => {
        onSongPress(
          item.songId,
          item.songNumber,
          item.songName,
          item.singerName,
          item.album,
          item.melonLink,
          item.isMr,
          item.isLive,
        );
      }}
      onKeepAddPress={() => onKeepAddPress(item.songId)}
      onKeepRemovePress={() => onKeepRemovePress(item.songId)}
    />
  ),
);

const RefreshSongsList = ({
  songlistData,
  isShowKeepIcon = false,
  onSongPress,
  onKeepAddPress,
  onKeepRemovePress,
  handleRefreshSongs,
  onRefresh,
  isLoading,
  refreshing,
}: RefreshSongsListProps) => {
  // console.log('RefreshSongsList rendered!');
  // const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  // const insets = useSafeAreaInsets();

  return (
    <>
      <FlatList
        data={songlistData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <RenderItem
            item={item}
            onSongPress={onSongPress}
            onKeepAddPress={onKeepAddPress}
            onKeepRemovePress={onKeepRemovePress}
            isShowKeepIcon={isShowKeepIcon}
            // setIsModalVisible={setIsModalVisible}
          />
        )}
        style={tw`h-[50%]`}
        contentContainerStyle={tw`flex-grow`}
        onEndReached={handleRefreshSongs}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoading ? (
            <View style={tw`py-10`}>
              <ActivityIndicator size="large" color={designatedColor.VIOLET} />
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={designatedColor.VIOLET2} // RefreshControl indicator color (iOS)
            colors={[designatedColor.VIOLET2]}
          /> // RefreshControl indicator colors (Android)/>
        }
      />
      {/* <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => {
          setIsModalVisible(false);
        }}
        style={[
          {
            justifyContent: 'flex-end',
            margin: 0,
          },
          Platform.OS == 'ios' && {paddingBottom: insets.bottom},
        ]}>
        <View style={tw`bg-black w-full px-4`}>
          <Text style={tw`text-white font-bold text-xl my-4`}>댓글</Text>
          <View
            style={tw`items-start border-b border-[${designatedColor.GRAY4}] py-4`}>
            <View style={tw`mb-3`}>
              <TextButton
                title="KEEP에 추가"
                onPress={() => {}}
                color="white"
                size={4}
              />
            </View>
          </View>
          <View style={tw`py-4`}>
            <TextButton
              title="닫기"
              onPress={() => {
                setIsModalVisible(false);
              }}
              color="white"
              size={4}
            />
          </View>
        </View>
      </Modal> */}
    </>
  );
};

// 먼저 메모이제이션된 컴포넌트를 생성
const MemoizedRefreshSongsList = memo(RefreshSongsList);

// export 시에 중괄호를 사용
export {MemoizedRefreshSongsList as RefreshSongsList};

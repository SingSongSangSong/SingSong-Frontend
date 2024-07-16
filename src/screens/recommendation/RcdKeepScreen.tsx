import {SafeAreaView} from 'react-native';
import React from 'react';
import tw from 'twrnc';
import {Keeplist, AddTextButton, Folderlist} from '../../components';
import useKeep from '../../hooks/useKeep';

type FolderItem = {
  id: string;
};

const folders: FolderItem[] = new Array(10).fill(null).map((_, index) => ({
  id: index.toString(),
}));

function RcdKeepScreen() {
  const keepHandler = useKeep();

  return (
    <SafeAreaView style={tw`w-full h-full bg-[#151515]`}>
      <SafeAreaView style={tw`flex-1 border-b border-white`}>
        <Folderlist
          folders={folders}
          onFolderPress={keepHandler.handleFolderPress}
        />
      </SafeAreaView>
      <Keeplist storedSong={keepHandler.storedSong} />
      <AddTextButton
        title="플레이리스트"
        onPress={keepHandler.handleStoredPlaylist}
        modalVisible={keepHandler.modalVisible}
        onCloseModal={keepHandler.handleCloseModal}
      />
    </SafeAreaView>
  );
}

export default RcdKeepScreen;

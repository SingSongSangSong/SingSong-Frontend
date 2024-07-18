import React from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import FolderIcon from '../../assets/svg/folder.svg';

type FolderItem = {
  id: string;
};

type FolderlistProps = {
  folders: FolderItem[];
  onFolderPress: (id: string) => void;
};

const Folderlist: React.FC<FolderlistProps> = ({folders, onFolderPress}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`w-full h-full`}>
      {folders.map(item => (
        <TouchableOpacity key={item.id} onPress={() => onFolderPress(item.id)}>
          <View style={tw`m-2`}>
            <FolderIcon width={64} height={64} />
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export {Folderlist};

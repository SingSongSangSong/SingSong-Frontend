import React from 'react';
import {View, Text} from 'react-native';
import tw from 'twrnc';
import {Taglist, TextButton} from '..'; // import TextButton component
import {designatedColor} from '../../constants';
import useSongStore from '../../store/useSongStore';

interface TaglistModuleProps {
  onPressTotalButton: () => void;
  onPressTagButton: (tag: string) => void;
}

const TaglistModule = ({
  onPressTotalButton,
  onPressTagButton,
}: TaglistModuleProps) => {
  // const {tags} = useSongStore();
  const tags = useSongStore(state => state.tags);
  return (
    <View
      style={tw` border-t-[1px] border-[${designatedColor.GRAY4}] py-4 mx-2 my-2`}>
      <View style={tw`justify-between flex-row mx-4 items-center mx-4`}>
        <Text style={tw`text-white text-sm font-bold my-2`}>
          어떤 노래를 찾으시나요?
        </Text>
        <TextButton
          title="전체보기"
          onPress={onPressTotalButton}
          color={designatedColor.GRAY3}
          size={3}
        />
      </View>
      <Taglist tags={tags} handleOnTagButton={onPressTagButton} />
    </View>
  );
};

export {TaglistModule};

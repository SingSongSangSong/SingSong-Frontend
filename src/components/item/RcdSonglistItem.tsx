import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {designatedColor} from '../../constants';
import tw from 'twrnc';
import useKeepListStore from '../../store/useKeepStore';

interface RcdSonglistItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
  onPress: () => void;
  onAddPress: () => void;
  onRemovePress: () => void;
  showKeepIcon: boolean;
  onToggleAddStored: () => void;
  onToggleRemoveStored: () => void;
}

const RcdSonglistItem: React.FC<RcdSonglistItemProps> = ({
  songNumber,
  songName,
  singerName,
  onPress,
  onAddPress,
  onRemovePress,
  showKeepIcon,
  onToggleAddStored,
  onToggleRemoveStored,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [keepColor, setKeepColor] = useState<string>(
    designatedColor.KEEP_EMPTY,
  );
  // const {keepList} = useKeepListStore();
  const keepList = useKeepListStore(state => state.keepList);
  const isStored = keepList.some(
    keepSong => keepSong.songNumber === songNumber,
  );

  useEffect(() => {
    if (isStored) {
      setKeepColor(designatedColor.KEEP_FILLED);
    } else {
      setKeepColor(designatedColor.KEEP_EMPTY);
    }
  }, [isStored]);

  const handleToggleStored = () => {
    if (keepColor == designatedColor.KEEP_EMPTY) {
      onToggleAddStored();
    } else {
      onToggleRemoveStored();
    }

    setKeepColor(prevColor =>
      prevColor === designatedColor.KEEP_EMPTY
        ? designatedColor.KEEP_FILLED
        : designatedColor.KEEP_EMPTY,
    );
  };

  return (
    <TouchableOpacity onPress={onPress} style={tw`w-full`}>
      <View
        style={[
          tw`flex-row justify-between items-center p-2 border-b border-[${designatedColor.GRAY4}]`,
          isPressed && tw`bg-gray-300`,
        ]}>
        <View style={tw`flex-row items-center flex-1`}>
          <View style={tw`w-[12] justify-center items-center mr-3`}>
            <Text
              style={[
                tw`font-bold text-sm text-white text-[${designatedColor.GREEN}] `,
                isPressed && tw`text-black`,
              ]}>
              {songNumber}
            </Text>
          </View>

          <View style={tw`flex-1`}>
            <Text
              style={[tw`font-bold text-white`, isPressed && tw`text-black`]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {songName}
            </Text>
            <Text
              style={[tw`text-white`, isPressed && tw`text-black`]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {singerName}
            </Text>
          </View>
        </View>
        {showKeepIcon && (
          <TouchableOpacity onPress={handleToggleStored} style={tw`p-4`}>
            <Icon name="star" size={20} color={keepColor} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export {RcdSonglistItem};

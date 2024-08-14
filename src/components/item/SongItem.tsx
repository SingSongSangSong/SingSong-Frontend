import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import KeepIcon from '../../assets/svg/keepIcon.svg';
import KeepFilledIcon from '../../assets/svg/keepFilledIcon.svg';
interface SongItemProps {
  songId: number;
  songNumber: number;
  songName: string;
  singerName: string;
  album: string | undefined;
  isKeep: boolean | undefined;
  isShowKeepIcon: boolean;
  onSongPress: () => void;
  onKeepAddPress: () => void | undefined;
  onKeepRemovePress: () => void | undefined;
}

const SongItem = ({
  songId,
  songNumber,
  songName,
  singerName,
  album = '',
  isKeep = true,
  isShowKeepIcon,
  onSongPress,
  onKeepAddPress = () => {},
  onKeepRemovePress = () => {},
}: SongItemProps) => {
  const [isKeepPressed, setIsKeepPressed] = useState(isKeep);

  const handleOnKeepPress = () => {
    if (isKeepPressed) {
      onKeepRemovePress();
      setIsKeepPressed(!isKeepPressed);
    } else {
      onKeepAddPress();
      setIsKeepPressed(!isKeepPressed);
    }
  };

  return (
    <TouchableOpacity onPress={onSongPress}>
      <View
        style={tw`flex-row items-center justify-between border-b border-[${designatedColor.GRAY4}] p-3 mx-2`}>
        <View>
          <View style={tw`items-center justify-center w-[12]`}>
            <Text
              style={tw`text-white text-sm text-[${designatedColor.GREEN}] font-bold `}>
              {songNumber}
            </Text>
          </View>

          <View style={tw`h-full ml-4 flex-1`}>
            <View style={tw`flex-row`}>
              <Text
                style={tw`text-white text-sm`}
                numberOfLines={1}
                ellipsizeMode="tail">
                {songName}
              </Text>
            </View>
            <Text
              style={tw`text-white text-sm mt-1 text-[${designatedColor.DARK_GRAY}]`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {singerName}
            </Text>
          </View>
        </View>
        <View>
          {isShowKeepIcon && (
            <>
              {isKeepPressed ? (
                <TouchableOpacity onPress={handleOnKeepPress} style={tw`p-2`}>
                  <KeepFilledIcon />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleOnKeepPress} style={tw`p-2`}>
                  <KeepIcon />
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export {SongItem};

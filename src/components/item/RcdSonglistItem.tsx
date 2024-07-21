import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {designatedColor} from '../../constants';
import tw from 'twrnc';

interface RcdSonglistItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
  onAddPress: () => void;
  onRemovePress: () => void;
  showKeepIcon: boolean;
  onToggleAddStored: () => void;
  onToggleRemoveStored: () => void;
  // keepColor: (typeof designatedColor)[keyof typeof designatedColor];
  // keepColor: string;
}

const RcdSonglistItem: React.FC<RcdSonglistItemProps> = ({
  songNumber,
  songName,
  singerName,
  onAddPress,
  onRemovePress,
  showKeepIcon,
  onToggleAddStored,
  onToggleRemoveStored,
  // keepColor = designatedColor.KEEP_EMPTY,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [keepColor, setKeepColor] = useState<string>(
    designatedColor.KEEP_EMPTY,
  ); // 초기 색상을 설정

  const handleToggleStored = () => {
    if (keepColor == designatedColor.KEEP_EMPTY) {
      onToggleAddStored();
    } else {
      console.log(keepColor);
      onToggleRemoveStored();
    }

    setKeepColor(prevColor =>
      prevColor === designatedColor.KEEP_EMPTY
        ? designatedColor.KEEP_FILLED
        : designatedColor.KEEP_EMPTY,
    ); // 색상 변경
  };

  const handlePress = () => {
    setIsPressed(!isPressed);
    if (onAddPress && !isPressed) {
      console.log('add');
      onAddPress();
    } else if (onRemovePress && isPressed) {
      console.log('remove');
      onRemovePress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          isPressed && styles.innerContainerPressed,
        ]}>
        <View style={styles.textContainer}>
          <Text style={[styles.songNumber, isPressed && styles.textPressed]}>
            {songNumber}
          </Text>
          <View>
            <Text style={[styles.songName, isPressed && styles.textPressed]}>
              {songName}
            </Text>
            <Text style={[styles.singerName, isPressed && styles.textPressed]}>
              {singerName}
            </Text>
          </View>
        </View>
        {showKeepIcon && (
          <TouchableOpacity onPress={handleToggleStored} style={tw`p-4`}>
            <Icon name="star" size={24} color={keepColor} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 4,
    padding: 5,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'black',
  },
  innerContainerPressed: {
    backgroundColor: '#CCCCCC',
  },
  textContainer: {
    flexDirection: 'row',
    height: '100%',
    alignItems: 'center',
  },
  songNumber: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    marginRight: 12,
  },
  songName: {
    fontWeight: 'bold',
    color: 'white',
  },
  singerName: {
    color: 'white',
  },
  textPressed: {
    color: 'black',
  },
});

export {RcdSonglistItem};

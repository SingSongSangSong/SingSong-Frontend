import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CustomText from '../text/CustomText';

interface PreviewlistItemProps {
  songNumber: number;
  songName: string;
  singerName: string;
}

const PreviewlistItem: React.FC<PreviewlistItemProps> = ({
  songNumber,
  songName,
  singerName,
}) => {
  return (
    <View style={[styles.innerContainer]}>
      <View style={styles.textContainer}>
        <CustomText style={[styles.songNumber]}>{songNumber}</CustomText>
        <View>
          <CustomText style={[styles.songName]}>{songName}</CustomText>
          <CustomText style={[styles.singerName]}>{singerName}</CustomText>
        </View>
      </View>
    </View>
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

export {PreviewlistItem};

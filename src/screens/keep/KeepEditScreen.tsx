import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {designatedColor, keepStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {KeepStackParamList} from '../../types';
import useKeep from '../../hooks/useKeep';
import {
  CircleButton,
  PlusButton,
  RemoveButton,
  SonglistEdit,
} from '../../components';

type KeepEditScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP_EDIT
>;

function KeepEditScreen({navigation}: KeepEditScreenProps) {
  const keepHandler = useKeep();

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND}]`}>
      <View style={tw`flex-row items-center justify-between m-2 my-4`}>
        <View style={tw`flex-row items-center justify-between`}>
          <CircleButton
            onPressIn={keepHandler.handleIsAllSelected}
            onPressOut={keepHandler.handleIsAllDeleted}
            isSelected={false}
            isDeleted={false}
          />
          <Text style={tw`text-white ml-4`}>전체 선택</Text>
        </View>
        <View>
          <PlusButton title="곡 추가" onPress={() => {}} />
        </View>
      </View>
      <SonglistEdit
        songlistData={keepHandler.keepList}
        onPressIn={keepHandler.handleInCircleButton}
        onPressOut={keepHandler.handleOutCircleButton}
        isAllSelected={keepHandler.isAllSelected}
        isAllDeleted={keepHandler.isAllDeleted}
      />
      {keepHandler.removedSong.length > 0 && (
        <View style={tw`justify-center items-center p-4`}>
          <RemoveButton
            title={'삭제'}
            count={keepHandler.removedSong.length}
            onPress={keepHandler.handleRemoveButton}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

export default KeepEditScreen;

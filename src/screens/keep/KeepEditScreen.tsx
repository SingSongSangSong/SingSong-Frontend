import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {keepStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {KeepStackParamList} from '../../types';
import useKeep from '../../hooks/useKeep';
import {CheckButton, RemoveButton, SonglistEdit} from '../../components';

type KeepEditScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP_EDIT
>;

function KeepEditScreen({navigation}: KeepEditScreenProps) {
  const keepHandler = useKeep();

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-row items-center justify-between m-4`}>
        <CheckButton
          onPressIn={keepHandler.handleIsAllSelected}
          onPressOut={keepHandler.handleIsAllDeleted}
          isSelected={false}
          isDeleted={false}
        />
      </View>

      <View style={tw`flex-1`}>
        {keepHandler.keepList.length > 0 ? (
          <SonglistEdit
            songlistData={keepHandler.keepList}
            onPressIn={keepHandler.handleInCircleButton}
            onPressOut={keepHandler.handleOutCircleButton}
            isAllSelected={keepHandler.isAllSelected}
            isAllDeleted={keepHandler.isAllDeleted}
          />
        ) : (
          <View style={tw`flex-1 justify-center items-center`}>
            <Text style={tw`text-white font-bold`}>Keep이 비어있어요</Text>
          </View>
        )}
      </View>

      {keepHandler.removedSong.length > 0 && (
        <View style={tw`justify-center items-center py-2 bg-black`}>
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

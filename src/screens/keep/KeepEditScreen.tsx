import React, {useEffect} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {keepStackNavigations} from '../../constants';
import tw from 'twrnc';
import {StackScreenProps} from '@react-navigation/stack';
import {KeepStackParamList} from '../../types';
import useKeep from '../../hooks/useKeep';
import {
  AddTextButton,
  CheckButton,
  CustomModal,
  RemoveButton,
  SonglistEdit,
} from '../../components';
import {useRoute} from '@react-navigation/native';
import {logScreenView} from '../../utils';

type KeepEditScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP_EDIT
>;

function KeepEditScreen({navigation}: KeepEditScreenProps) {
  const keepHandler = useKeep();

  // const route = useRoute();
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     console.log('route name', route.name);
  //     logScreenView(route.name); // 스크린이 포커스될 때 로그 이벤트 발생
  //   });

  //   return unsubscribe;
  // }, [navigation, route]);

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-row items-center justify-between m-4`}>
        <CheckButton
          onPressIn={keepHandler.handleIsAllSelected}
          onPressOut={keepHandler.handleIsAllDeleted}
          isSelected={false}
          isDeleted={false}
        />
        <AddTextButton title="곡 추가" onPress={() => {}} isCenter={true} />
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
            onPress={() => {
              keepHandler.setIsRemoved(true);
            }}
          />
        </View>
      )}
      <CustomModal
        visible={keepHandler.isRemoved}
        onClose={() => keepHandler.setIsRemoved(false)}
        message={'선택한 곡을 삭제하시겠습니까?'}
        onConfirm={keepHandler.handleConfirmRemove}
        onCancel={() => keepHandler.setIsRemoved(false)}
        confirmText="삭제"
        cancelText="취소"
      />
    </SafeAreaView>
  );
}

export default KeepEditScreen;

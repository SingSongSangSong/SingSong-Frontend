import React, {useEffect} from 'react';
import {View} from 'react-native';
import tw from 'twrnc';
import {
  CheckButton,
  CustomModal,
  RemoveButton,
  SonglistEdit,
} from '../../components';
import {designatedColor, keepStackNavigations} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import CustomText from '../../components/text/CustomText';
import {KeepStackParamList} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import {logPageView} from '../../utils';
import useKeepEdit from '../../hooks/useKeepEdit';

type KeepEditScreenProps = StackScreenProps<
  KeepStackParamList,
  typeof keepStackNavigations.KEEP_EDIT
>;

function KeepEditScreen(props: KeepEditScreenProps) {
  const keepHandler = useKeepEdit();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    logPageView(props.route.name);
  }, []);
  return (
    <View
      style={[
        tw`flex-1  bg-[${designatedColor.BACKGROUND_BLACK}]`,
        {
          // paddingBottom: 80,
          // paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}>
      {keepHandler.keepList.length > 0 && (
        <View style={tw`flex-row items-center justify-between m-4`}>
          <CheckButton
            onPressIn={keepHandler.handleIsAllSelected}
            onPressOut={keepHandler.handleIsAllDeleted}
            isSelected={false}
            isDeleted={false}
          />
          {/* <AddTextButton title="곡 추가" onPress={() => {}} isCenter={true} /> */}
        </View>
      )}
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
            <CustomText style={tw`text-[${designatedColor.VIOLET2}] font-bold`}>
              KEEP이 비어있어요
            </CustomText>
          </View>
        )}
      </View>

      {keepHandler.removedSong.length > 0 && (
        <View
          style={tw`justify-center items-center py-2 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
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
    </View>
  );
}

export default KeepEditScreen;

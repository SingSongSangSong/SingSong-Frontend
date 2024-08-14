import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {SafeAreaView, Text, View} from 'react-native';
import useBlacklist from '../../hooks/useBlacklist';
import {BlacklistList} from '../../components';
import ErrorIcon from '../../assets/svg/error.svg';

type BlacklistScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.BLACKLIST
>;

function BlacklistScreen({navigation}: BlacklistScreenProps) {
  const blacklistHandler = useBlacklist();

  if (blacklistHandler.blacklist === null) {
    // blacklist가 null일 때는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-black`}>
      <View style={tw`flex-1`}>
        {blacklistHandler.blacklist &&
          (blacklistHandler.blacklist.length > 0 ? (
            <BlacklistList
              blacklistData={blacklistHandler.blacklist}
              onDeletePress={blacklistHandler.handleOnPressDelete}
            />
          ) : (
            <View style={tw`flex-1 justify-center items-center`}>
              <View style={tw`flex-1 items-center justify-center`}>
                <ErrorIcon width={50} height={50} />
                <Text
                  style={tw`text-[${designatedColor.PINK2}] font-bold mt-4`}>
                  차단한 유저가 없어요
                </Text>
              </View>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}

export default BlacklistScreen;

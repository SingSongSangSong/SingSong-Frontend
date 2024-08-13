import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {homeStackNavigations} from '../../constants';
import {SafeAreaView, Text, View} from 'react-native';
import useBlacklist from '../../hooks/useBlacklist';
import {BlacklistList} from '../../components';

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
              <Text style={tw`text-white font-bold`}>
                차단한 목록이 없어요.
              </Text>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}

export default BlacklistScreen;

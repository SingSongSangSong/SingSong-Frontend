import React, {useEffect} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import tw from 'twrnc';
import {HomeStackParamList} from '../../types';
import {designatedColor, homeStackNavigations} from '../../constants';
import {SafeAreaView, View} from 'react-native';
import useBlacklist from '../../hooks/useBlacklist';
import {BlacklistList} from '../../components';
import ErrorIcon from '../../assets/svg/error.svg';
import CustomText from '../../components/text/CustomText';
import {logPageView} from '../../utils';

type BlacklistScreenProps = StackScreenProps<
  HomeStackParamList,
  typeof homeStackNavigations.BLACKLIST
>;

function BlacklistScreen(props: BlacklistScreenProps) {
  const blacklistHandler = useBlacklist();

  useEffect(() => {
    logPageView(props.route.name);
  }, []);

  if (blacklistHandler.blacklist === null) {
    // blacklist가 null일 때는 아무것도 렌더링하지 않음
    return null;
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-[${designatedColor.BACKGROUND_BLACK}]`}>
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
                <CustomText
                  style={tw`text-[${designatedColor.PINK2}] font-bold mt-4`}>
                  차단한 유저가 없어요
                </CustomText>
              </View>
            </View>
          ))}
      </View>
    </SafeAreaView>
  );
}

export default BlacklistScreen;

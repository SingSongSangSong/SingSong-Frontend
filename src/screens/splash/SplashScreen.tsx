import React, {useEffect, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View, Animated, Dimensions, Image} from 'react-native';
import tw from 'twrnc';
import {AppStackParamList} from '../../types';
import {appStackNavigations, designatedColor} from '../../constants';
import * as amplitude from '@amplitude/analytics-react-native';
import {CustomModal} from '../../components';
import useInit from '../../hooks/useInit';

type SplashScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.SPLASH
>;

export default function SplashScreen({navigation}: SplashScreenProps) {
  const initHandler = useInit();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const firstTextOpacity = useRef(new Animated.Value(0)).current;
  const secondTextOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 로고 애니메이션 먼저 시작
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 500, // 0.8초 동안 로고가 나타남
      useNativeDriver: true,
    }).start();

    // 비동기적으로 버전 체크를 진행
    const checkVersionAndProceed = async () => {
      const shouldProceed = await initHandler.versionCheck();
      console.log('shouldProceed', shouldProceed);
      if (!shouldProceed) {
        console.log('stop!!!!!!!');
        return; // 업데이트가 필요하므로 애니메이션 중단
      }

      // 애니메이션을 시작하기로 결정한 경우 실행
      initHandler.setShouldStartAnimation(true);
    };

    checkVersionAndProceed();
  }, []);

  useEffect(() => {
    if (initHandler.shouldStartAnimation) {
      const runActualAnimations = async () => {
        const isValidTokenPromise = initHandler.getIsValidToken();
        const isValidToken = await isValidTokenPromise;

        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500, // 0.8초 동안 로고가 나타남
          useNativeDriver: true,
        }).start(() => {
          if (isValidToken) {
            setTimeout(() => {
              amplitude.track('MAIN');
              navigation.replace(appStackNavigations.MAIN);
            }, 200);
          } else {
            setTimeout(() => {
              Animated.timing(logoOpacity, {
                toValue: 0,
                duration: 1000, // 0.5초 동안 로고가 사라짐
                useNativeDriver: true,
              }).start(() => {
                Animated.timing(firstTextOpacity, {
                  toValue: 1,
                  duration: 1000, // 0.5초 동안 첫 번째 텍스트가 나타남
                  useNativeDriver: true,
                }).start();

                setTimeout(() => {
                  Animated.timing(secondTextOpacity, {
                    toValue: 1,
                    duration: 1000, // 0.5초 동안 두 번째 텍스트가 나타남
                    useNativeDriver: true,
                  }).start(() => {
                    amplitude.track('LOGIN');
                    navigation.replace(appStackNavigations.LOGIN);
                  });
                }, 1000);
              });
            }, 500);
          }
        });
      };

      runActualAnimations();
    }
  }, [initHandler.shouldStartAnimation]);

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View
      style={[
        tw`w-full h-full bg-black items-center justify-start`,
        {paddingTop: deviceHeight * 0.35},
      ]}>
      <View style={tw`items-center`}>
        <CustomModal
          visible={initHandler.isModalVisible}
          onClose={() => {}}
          message={
            initHandler.isForced
              ? initHandler.forceUpdateMessage.message
              : initHandler.optionalUpdateMessage.message
          }
          onConfirm={initHandler.handleOnConfirmButton}
          onCancel={initHandler.handleOnCancelButton}
          confirmText={
            initHandler.isForced
              ? initHandler.forceUpdateMessage.buttonPositive
              : initHandler.optionalUpdateMessage.buttonPositive
          }
          cancelText={
            initHandler.isForced
              ? initHandler.forceUpdateMessage.buttonNegative
              : initHandler.optionalUpdateMessage.buttonNegative
          }
        />
        {/* 로고 애니메이션 */}

        <Animated.View
          style={{
            opacity: logoOpacity,
            position: 'absolute',
            transform: [{translateY: -deviceHeight * 0.1}],
          }}>
          <Image
            source={require('../../assets/png/shinedLogo.png')}
            style={{width: 246, height: 129}}
          />
          {/* <ShinedLogoIcon /> */}
        </Animated.View>

        {/* 첫 번째 텍스트 애니메이션 */}
        <Animated.View
          style={{
            opacity: firstTextOpacity,
          }}>
          <Text style={tw`text-white font-bold text-3xl`}>
            싱숭생숭한 기분을
          </Text>
        </Animated.View>

        {/* 두 번째 텍스트 애니메이션 */}
        <Animated.View style={{opacity: secondTextOpacity, marginTop: 2}}>
          <Text style={tw`text-[${designatedColor.PINK}] font-bold text-3xl`}>
            싱송생송하게
          </Text>
        </Animated.View>
      </View>
    </View>
  );
}

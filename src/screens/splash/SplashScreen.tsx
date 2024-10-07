import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Animated, Dimensions, Image} from 'react-native';
import tw from 'twrnc';
import {appStackNavigations, designatedColor} from '../../constants';
import {CustomModal} from '../../components';
import useInit from '../../hooks/useInit';
import {AppStackParamList} from '../../types';

type SplashScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.SPLASH
>;

export default function SplashScreen({navigation}: SplashScreenProps) {
  const initHandler = useInit();
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const firstTextOpacity = useRef(new Animated.Value(0)).current;
  const secondTextOpacity = useRef(new Animated.Value(0)).current;
  const textFadeOutOpacity = useRef(new Animated.Value(1)).current;
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const runAnimations = async () => {
      const tempIsValidToken = await initHandler.getIsValidToken();
      setIsValidToken(tempIsValidToken);
      if (tempIsValidToken) {
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(async () => {
          // 버전 체크 실행
          const shouldProceed = await initHandler.versionCheck();
          if (!shouldProceed) {
            // 업데이트가 필요한 경우, 모달을 표시하여 사용자가 업데이트를 진행하도록 유도
            initHandler.setIsModalVisible(true);
            return; // 업데이트가 필요하면 더 이상 진행하지 않음
          }
          // 버전 체크 통과 시 메인 화면으로 이동
          setTimeout(() => {
            navigation.replace(appStackNavigations.MAIN);
          }, 500);
        });
      } else {
        // 텍스트 애니메이션을 먼저 실행
        Animated.timing(firstTextOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start(() => {
          setTimeout(() => {
            Animated.timing(secondTextOpacity, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }).start(() => {
              setTimeout(() => {
                Animated.timing(textFadeOutOpacity, {
                  toValue: 0,
                  duration: 500,
                  useNativeDriver: true,
                }).start(() => {
                  // setShowLogo(true);
                  Animated.timing(logoOpacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                  }).start(async () => {
                    // 버전 체크 실행
                    const shouldProceed = await initHandler.versionCheck();
                    if (!shouldProceed) {
                      // 업데이트가 필요한 경우, 모달을 표시하여 사용자가 업데이트를 진행하도록 유도
                      initHandler.setIsModalVisible(true);
                      return; // 업데이트가 필요하면 더 이상 진행하지 않음
                    }
                    navigation.replace(appStackNavigations.LOGIN);
                  });
                });
              }, 500);
            });
          }, 500);
        });
      }
    };

    runAnimations();
  }, []);

  const deviceHeight = Dimensions.get('window').height;

  return (
    <View
      style={[
        tw`w-full h-full bg-black items-center justify-start`,
        {paddingTop: deviceHeight * 0.25},
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
          onCancel={() => {
            initHandler.handleOnCancelButton();
            if (!initHandler.isForced) {
              if (isValidToken) {
                navigation.replace(appStackNavigations.MAIN);
              } else {
                navigation.replace(appStackNavigations.LOGIN);
              }
            }
          }}
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
        <Animated.View
          style={{
            opacity: firstTextOpacity,
          }}>
          <Animated.Text
            style={[
              tw`text-white font-bold text-3xl`,
              {opacity: textFadeOutOpacity},
            ]}>
            싱숭생숭한 기분을
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: secondTextOpacity,
            marginTop: 8,
          }}>
          <Animated.Text
            style={[
              tw`text-[${designatedColor.VIOLET}] font-bold text-3xl`,
              {opacity: textFadeOutOpacity},
            ]}>
            싱송생송하게
          </Animated.Text>
        </Animated.View>
        <Animated.View
          style={{
            opacity: logoOpacity,
            position: 'absolute',
          }}>
          <Image
            source={require('../../assets/png/shinedLogo.png')}
            style={{width: 246, height: 129}}
          />
        </Animated.View>
      </View>
    </View>
  );
}

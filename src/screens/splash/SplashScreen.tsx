import React, {useEffect, useRef, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {View, Animated, Dimensions, Image} from 'react-native';
import tw from 'twrnc';
import {appStackNavigations, designatedColor} from '../../constants';
import * as amplitude from '@amplitude/analytics-react-native';
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

  const [showLogoImmediately, setShowLogoImmediately] = useState(false);

  useEffect(() => {
    const runAnimations = async () => {
      const isValidToken = await initHandler.getIsValidToken();
      console.log('isValidToken', isValidToken);

      if (isValidToken) {
        setShowLogoImmediately(true); // 유효한 토큰이 있으면 로고를 즉시 표시
        amplitude.track('MAIN');
        setTimeout(() => {
          navigation.replace(appStackNavigations.MAIN); // 즉시 메인 화면으로 이동
        }, 500); // 잠시 로고가 보이도록 지연 시간 설정
      } else {
        // 유효한 토큰이 없으면 텍스트 애니메이션을 실행하고 로고를 나중에 표시
        Animated.timing(firstTextOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          Animated.timing(secondTextOpacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start(() => {
            setTimeout(() => {
              Animated.timing(textFadeOutOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              }).start(() => {
                // 문구가 사라진 후 로고 애니메이션 실행
                Animated.timing(logoOpacity, {
                  toValue: 1,
                  duration: 1000,
                  useNativeDriver: true,
                }).start(() => {
                  amplitude.track('LOGIN');
                  navigation.replace(appStackNavigations.LOGIN);
                });
              });
            }, 1000);
          });
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

        {/* 첫 번째 텍스트 애니메이션 (유효한 토큰이 없을 경우에만) */}
        {!showLogoImmediately && (
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
        )}

        {/* 두 번째 텍스트 애니메이션 (유효한 토큰이 없을 경우에만) */}
        {!showLogoImmediately && (
          <Animated.View
            style={{
              opacity: secondTextOpacity,
              marginTop: 8,
            }}>
            <Animated.Text
              style={[
                tw`text-[${designatedColor.PINK}] font-bold text-3xl`,
                {opacity: textFadeOutOpacity},
              ]}>
              싱송생송하게
            </Animated.Text>
          </Animated.View>
        )}

        {/* 로고 즉시 표시 또는 애니메이션 표시 */}
        {showLogoImmediately ? (
          <Image
            source={require('../../assets/png/shinedLogo.png')}
            style={{width: 246, height: 129}}
          />
        ) : (
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
        )}
      </View>
    </View>
  );
}

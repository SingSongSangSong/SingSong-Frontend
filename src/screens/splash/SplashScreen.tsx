import React, {useEffect, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View, Animated, Dimensions, Image} from 'react-native';
import tw from 'twrnc';
import {AppStackParamList} from '../../types';
import {appStackNavigations, designatedColor} from '../../constants';
import useUserInfo from '../../hooks/useUserInfo';
import {useRoute} from '@react-navigation/native';
import {logScreenView} from '../../utils';
import * as amplitude from '@amplitude/analytics-react-native';

type SplashScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.SPLASH
>;

export default function SplashScreen({navigation}: SplashScreenProps) {
  // const fetchDataHandler = useFetchData();
  const route = useRoute();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('route name', route.name);
      logScreenView(route.name); // 스크린이 포커스될 때 로그 이벤트 발생
    });

    return unsubscribe;
  }, [navigation, route]);

  const userInfoHandler = useUserInfo();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const firstTextOpacity = useRef(new Animated.Value(0)).current;
  const secondTextOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const runAnimations = async () => {
      // 데이터를 미리 가져오기 시작
      const isValidTokenPromise = userInfoHandler.getIsValidToken();
      const isValidToken = await isValidTokenPromise;
      // await fetchDataHandler.fetchData();
      // 로고가 나타나는 애니메이션 (즉시 나타남)
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500, // 0.8초 동안 로고가 나타남
        useNativeDriver: true,
      }).start(() => {
        if (isValidToken) {
          // fetchDataHandler.fetchRcdHomeSongs();
          setTimeout(() => {
            amplitude.track('MAIN');
            navigation.replace(appStackNavigations.MAIN);
          }, 200);

          // }, 100); // 로고가 0.5초 동안 보인 후 메인 화면으로 이동
        } else {
          // 로고가 완전히 나타난 후 0.5초 후에 사라지는 애니메이션 시작
          setTimeout(() => {
            Animated.timing(logoOpacity, {
              toValue: 0,
              duration: 1000, // 0.5초 동안 로고가 사라짐
              useNativeDriver: true,
            }).start(() => {
              // 첫 번째 텍스트가 나타나는 애니메이션
              Animated.timing(firstTextOpacity, {
                toValue: 1,
                duration: 1000, // 0.5초 동안 첫 번째 텍스트가 나타남
                useNativeDriver: true,
              }).start();

              // 두 번째 텍스트가 나타나는 애니메이션
              setTimeout(() => {
                Animated.timing(secondTextOpacity, {
                  toValue: 1,
                  duration: 1000, // 0.5초 동안 두 번째 텍스트가 나타남
                  useNativeDriver: true,
                }).start(() => {
                  amplitude.track('LOGIN');
                  navigation.replace(appStackNavigations.LOGIN);
                });
              }, 1000); // 첫 번째 텍스트가 나타난 후 바로 두 번째 텍스트가 나타남
            });
          }, 500); // 로고가 나타난 후 0.5초 후에 사라짐
        }
      });
    };

    runAnimations();
  }, []);

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  return (
    <View
      style={[
        tw`w-full h-full bg-black items-center justify-start`,
        {paddingTop: deviceHeight * 0.35},
      ]}>
      <View style={tw`items-center`}>
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
        </Animated.View>

        {/* 첫 번째 텍스트 애니메이션 */}
        <Animated.View
          style={{
            opacity: firstTextOpacity,
          }}>
          {/* <View style={tw`relative w-full h-full`}>
            <Image
              source={require('../../assets/png/effect.png')}
              style={[
                {width: imageWidth, height: imageHeight},
                tw`absolute`,
                {top: 0, left: 0}, // 수정된 부분
              ]}
            />
          </View> */}
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

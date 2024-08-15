import React, {useEffect, useRef} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View, Animated, Dimensions, Image} from 'react-native';
import tw from 'twrnc';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';
import {AppStackParamList} from '../../types';
import {appStackNavigations, designatedColor} from '../../constants';
import useFetchData from '../../hooks/useFetchData';
import useUserInfo from '../../hooks/useUserInfo';

type SplashScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.SPLASH
>;

export default function SplashScreen({navigation}: SplashScreenProps) {
  const fetchDataHandler = useFetchData();
  const userInfoHandler = useUserInfo();

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const firstTextOpacity = useRef(new Animated.Value(0)).current;
  const secondTextOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 로고가 나타나는 애니메이션
    fetchDataHandler.fetchData();
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1000, // 1초
      useNativeDriver: true,
    }).start(() => {
      // 로고가 사라지는 애니메이션
      Animated.timing(logoOpacity, {
        toValue: 0,
        duration: 800, // 1초
        delay: 1000, // 1초 동안 유지한 후 사라짐
        useNativeDriver: true,
      }).start();
    });

    // 첫 번째 텍스트가 나타나는 애니메이션
    setTimeout(() => {
      Animated.timing(firstTextOpacity, {
        toValue: 1,
        duration: 1000, // 1초
        useNativeDriver: true,
      }).start();
    }, 2000); // 로고가 사라지고 나서 첫 번째 텍스트 나타남

    // 두 번째 텍스트가 나타나는 애니메이션
    setTimeout(() => {
      Animated.timing(secondTextOpacity, {
        toValue: 1,
        duration: 1000, // 1초
        useNativeDriver: true,
      }).start();
    }, 2400); // 첫 번째 텍스트가 나타난 후 두 번째 텍스트 나타남

    // 애니메이션 완료 후 로그인 화면으로 전환
    const timer = setTimeout(() => {
      handleNavigation();
    }, 3200); // 총 6초 후 로그인 화면으로 전환

    return () => clearTimeout(timer);
  }, []);

  const handleNavigation = async () => {
    const isValidToken = await userInfoHandler.getIsValidToken();
    if (isValidToken) {
      navigation.replace(appStackNavigations.MAIN);
    } else {
      navigation.replace(appStackNavigations.LOGIN);
    }
  };

  const deviceHeight = Dimensions.get('window').height;

  return (
    <View
      style={[
        tw`w-full h-full bg-black items-center justify-start`,
        {paddingTop: deviceHeight * 0.35},
      ]}>
      {/* 로고와 첫 번째 텍스트가 동일한 위치에 배치 */}
      <View style={tw`items-center`}>
        {/* 로고 애니메이션 */}
        <Animated.View
          style={{
            opacity: logoOpacity,
            position: 'absolute',
            transform: [{translateY: -deviceHeight * 0.1}],
          }}>
          {/* <WhiteLogoIcon /> */}
          <Image
            source={require('../../assets/png/shinedLogo.png')}
            // style={[
            //   tw`rounded-md`,
            //   {
            //     width: cardWidth,
            //     height: cardWidth,
            //   },
            // ]}
          />
        </Animated.View>

        {/* 첫 번째 텍스트 애니메이션 */}
        <Animated.View
          style={{
            opacity: firstTextOpacity,
            position: 'absolute',
          }}>
          <Text style={tw`text-white font-bold text-3xl`}>
            싱숭생숭한 기분을
          </Text>
        </Animated.View>
      </View>

      {/* 두 번째 텍스트 애니메이션 */}
      <Animated.View
        style={{opacity: secondTextOpacity, marginTop: deviceHeight * 0.05}}>
        <Text style={tw`text-[${designatedColor.PINK}] font-bold text-3xl`}>
          싱송생송하게
        </Text>
      </Animated.View>
    </View>
  );
}

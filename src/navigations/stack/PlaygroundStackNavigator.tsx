import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';
import {designatedColor, playgroundStackNavigations} from '../../constants';
import {NavigationProp} from '@react-navigation/native';
import {IconButton} from '../../components';
import ArrowLeftIcon from '../../assets/svg/arrowLeft.svg';
import DeleteIcon from '../../assets/svg/delete.svg';
import {Platform, View} from 'react-native';
import {PlaygroundStackParamList} from '../../types';
import PlaygroundScreen from '../../screens/playground/PlaygroundScreen';
import PostWriteScreen from '../../screens/playground/PostWriteScreen';
import PostDetailScreen from '../../screens/playground/PostDetailScreen';
import MusicIcon from '../../assets/svg/music.svg';
import CustomText from '../../components/text/CustomText';
import tw from 'twrnc';

const Stack = createStackNavigator<PlaygroundStackParamList>();

type PlaygroundStackNavigatorProps = {
  navigation: NavigationProp<PlaygroundStackParamList>;
};

// const handleOnPress = (navigation: any) => {
//   navigation.push(keepStackNavigations.KEEP_EDIT);
// };

function PlaygroundStackNavigator({navigation}: PlaygroundStackNavigatorProps) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <IconButton
            onPress={() => navigation.goBack()}
            Icon={ArrowLeftIcon}
            size={28}
          />
        ),
        headerStyle: {
          backgroundColor: designatedColor.BACKGROUND_BLACK, // 공통 헤더 배경색
          borderBottomWidth: 0, // 모든 플랫폼에서 경계선 제거
        },
        headerTintColor: 'white', // 공통 헤더 텍스트 색상
        headerTitleAlign: 'center', // 공통 헤더 제목 가운데 정렬
        headerTitleStyle: {
          fontSize: 18, // 공통 헤더 제목 글씨 크기
        },

        gestureEnabled: true,
        ...(Platform.OS === 'ios'
          ? {...TransitionPresets.SlideFromRightIOS} // iOS 전환 설정 (이미 gestureDirection 포함)
          : {
              transitionSpec: {
                open: TransitionSpecs.TransitionIOSSpec,
                close: TransitionSpecs.TransitionIOSSpec,
              },
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              gestureDirection: 'horizontal', // Android에서만 적용
            }),
      }}>
      <Stack.Screen
        name={playgroundStackNavigations.PLAYGROUND}
        component={PlaygroundScreen}
        options={({navigation}) => ({
          headerTitle: () => (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <CustomText
                style={tw`text-[${designatedColor.VIOLET3}] font-bold text-[18px]`}>
                PLAY
              </CustomText>
              <MusicIcon width={20} height={20} style={{marginHorizontal: 5}} />
              <CustomText
                style={tw`text-[${designatedColor.WHITE}] font-bold text-[18px]`}>
                GROUND
              </CustomText>
            </View>
          ),
          headerTitleAlign: 'left',
          headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name={playgroundStackNavigations.PLAYGROUND_POST_WRITE}
        component={PostWriteScreen}
        options={({navigation}) => ({
          headerTitle: '글쓰기', // 헤더 제목을 비움
          headerLeft: () => (
            <IconButton
              onPress={() => navigation.goBack()}
              Icon={DeleteIcon}
              size={28}
            />
          ),
          //   headerRight: () => (
          //     <NavButton
          //       onPress={() => handleOnPress(navigation)}
          //       title={'편집'}
          //     />
          //   ), // EditButton 컴포넌트를 전달
          // headerLeft: () => null,
        })}
      />
      <Stack.Screen
        name={playgroundStackNavigations.PLAYGROUND_POST_DETAIL}
        component={PostDetailScreen}
        options={({navigation}) => ({
          headerTitle: '', // 헤더 제목을 비움
          //   headerRight: () => (
          //     <NavButton
          //       onPress={() => handleOnPress(navigation)}
          //       title={'편집'}
          //     />
          //   ), // EditButton 컴포넌트를 전달
          // headerLeft: () => null,
        })}
      />
    </Stack.Navigator>
  );
}

export default PlaygroundStackNavigator;

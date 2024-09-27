import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Animated} from 'react-native';
import tw from 'twrnc';
import {TagIconButton} from '../button/TagIconButton';
import * as Icons from '../../assets/svg/tags';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import CustomText from '../text/CustomText';

type TaglistProps = {
  tags: string[];
  handleOnTagButton: (tag: string) => void;
};
type IconNames = keyof typeof Icons;

const Taglist = ({tags, handleOnTagButton}: TaglistProps) => {
  const [expanded, setExpanded] = useState(false);
  const rotateAnimation = useRef(new Animated.Value(0)).current;

  // 태그 8개까지 보여주거나 전체 보여주기
  const displayedTags = expanded ? tags : tags.slice(0, 8);

  // 화살표 회전 애니메이션
  const rotateArrow = () => {
    Animated.timing(rotateAnimation, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // 상태를 반대로 설정
    setExpanded(prev => !prev);
  };

  // 화살표 아이콘 회전 각도 설정
  const rotate = rotateAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'], // 0도에서 90도로 회전
  });

  return (
    <View style={tw`w-full`}>
      <TouchableOpacity
        onPress={rotateArrow}
        activeOpacity={0.8}
        style={tw`flex-row justify-between px-4 items-center mb-2`}>
        <CustomText style={tw`text-white text-base my-2`}>
          어떤 노래를 찾으시나요?
        </CustomText>
        <View style={tw`items-center my-2`}>
          <Animated.View style={{transform: [{rotate}]}}>
            {/* <Text style={tw`text-white text-xl`}>➤</Text> */}
            <ArrowRightIcon width={28} height={28} fill="white" />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <ScrollView
        horizontal={false}
        contentContainerStyle={tw`flex-row flex-wrap justify-center`}
        showsVerticalScrollIndicator={false}>
        {displayedTags.map((tag, index) => {
          const iconName: IconNames = `Icon${index + 1}` as IconNames;
          const IconComponent = Icons[iconName];

          return (
            <View key={index} style={tw`w-1/4 items-center mb-2`}>
              <TagIconButton
                tag={tag}
                index={index}
                onPress={() => handleOnTagButton(tag)}
                Icon={IconComponent}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export {Taglist};

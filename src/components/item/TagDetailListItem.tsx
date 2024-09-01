import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {useFocusEffect} from '@react-navigation/native';

interface TagDetailListItemProps {
  tag: string;
  Icon: any;
  onPress: () => void;
}

const TagDetailListItem = ({tag, Icon, onPress}: TagDetailListItemProps) => {
  const [isPressed, setIsPressed] = useState(false);

  // 컴포넌트가 포커스될 때마다 isPressed를 false로 초기화
  useFocusEffect(
    useCallback(() => {
      setIsPressed(false);
    }, []),
  );

  const handlePress = () => {
    console.log(isPressed);
    if (!isPressed) {
      setIsPressed(true);
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
      <View style={tw`flex-row my-2 mx-2 items-center`}>
        {/* 아이콘을 감싸는 하얀색 동그라미 배경 */}
        <View style={tw`w-13 h-13 rounded-full justify-center items-center`}>
          <Icon width={48} height={48} />
        </View>
        <Text style={tw`text-white ml-4`}>{tag}</Text>
      </View>
    </TouchableOpacity>
  );
};

export {TagDetailListItem};

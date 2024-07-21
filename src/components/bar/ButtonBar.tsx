import React from 'react';
import {View, ScrollView} from 'react-native';
import tw from 'twrnc';
import {TextButton} from '..';
import {buttonItem} from '../../types';

type ButtonBarProps = {
  buttonItems: buttonItem[];
};

const ButtonBar: React.FC<ButtonBarProps> = ({buttonItems}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={tw`h-20`}>
      {buttonItems.map((item, index) => (
        <View style={tw`m-1`}>
          <TextButton key={index} title={item.name} onPress={item.onPress} />
        </View>
      ))}
    </ScrollView>
  );
};

export {ButtonBar};

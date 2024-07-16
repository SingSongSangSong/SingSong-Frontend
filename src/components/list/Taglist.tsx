import React from 'react';
import {View, ScrollView} from 'react-native';
import tw from 'twrnc';
import {ClickableTag} from '../../components';

type TaglistProps = {
  tags: string[];
  onTagAdd: (tag: string) => void;
};

const Taglist: React.FC<TaglistProps> = ({tags, onTagAdd}) => {
  return (
    <View style={tw`w-full h-[50%] mt-8`}>
      <ScrollView>
        <View style={tw`flex-row flex-wrap`}>
          {tags.map((tag, index) => (
            <View key={index} style={tw`mb-1`}>
              <ClickableTag
                tag={tag}
                index={index}
                onPress={() => onTagAdd(tag)}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export {Taglist};

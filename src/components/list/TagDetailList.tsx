import {FlatList, View} from 'react-native';
import * as Icons from '../../assets/svg/tags';
import {TagDetailListItem} from '..';

type IconNames = keyof typeof Icons; // 'Icon1' | 'Icon2' | 'Icon3' ...

interface TagDetailListProps {
  tags: string[];
  onPress: (tag: string) => void;
}

const TagDetailList = ({tags, onPress}: TagDetailListProps) => {
  const renderItem = ({item, index}: {item: string; index: number}) => {
    const iconName: IconNames = `Icon${index + 1}` as IconNames; // 타입 단언을 통해 아이콘 이름 생성
    const IconComponent = Icons[iconName];

    return (
      <View>
        <TagDetailListItem
          tag={item}
          Icon={IconComponent}
          onPress={() => onPress(item)}
        />
      </View>
    );
  };

  return <FlatList data={tags} renderItem={renderItem} />;
};

export {TagDetailList};

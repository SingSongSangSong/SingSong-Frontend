import {TouchableOpacity, useWindowDimensions, View} from 'react-native';
import CustomText from '../../text/CustomText';
import tw from 'twrnc';
import {designatedColor, exampleTitleList} from '../../../constants';
import CommentVioletIcon from '../../../assets/svg/commentViolet.svg';

type RcdKeywordModuleProps = {
  onPressRcdKeyword: (rcdKeyword: string) => void;
};
const RcdKeywordModule = ({onPressRcdKeyword}: RcdKeywordModuleProps) => {
  const {width} = useWindowDimensions();

  return (
    <View style={tw`flex-1`}>
      <CustomText style={tw`text-[${designatedColor.GRAY3}] ml-2`}>
        추천 검색
      </CustomText>
      <View style={tw`py-2`}>
        {exampleTitleList?.map((keyword, index) => (
          <TouchableOpacity
            key={index}
            style={tw`flex-row items-center py-2 ml-4`}
            onPress={() => {
              console.log('press rcd keyword')!;
              onPressRcdKeyword(keyword);
            }}
            activeOpacity={0.9}>
            <CommentVioletIcon width={20} height={20} />
            <CustomText
              style={[
                tw`text-[${designatedColor.TEXT_WHITE}] text-[15px] pl-1 mr-2`,
                {
                  width: width * 0.9,
                },
              ]}>
              {keyword}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export {RcdKeywordModule};

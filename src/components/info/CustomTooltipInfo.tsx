import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import InfoIcon from '../../assets/svg/Info.svg'; // 실제로 사용하고 있는 SVG 컴포넌트 경로를 수정
import CustomText from '../text/CustomText';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

type CustomTooltipProps = {
  visible: boolean;
  onClose: () => void;
  content: string;
  position: {x: number; y: number};
  maxWidth: number; // 디바이스 너비를 전달받음
};

const CustomTooltip = ({
  visible,
  onClose,
  content,
  position,
  maxWidth, // 전달받은 디바이스 너비 사용
}: CustomTooltipProps) => {
  if (!visible) {
    return null;
  }

  return (
    // width 크기를 device width 크기를 고려해서 수정
    <View
      style={[
        {
          position: 'absolute',
          top: position.y,
          left: position.x,
          backgroundColor: designatedColor.GRAY5,
          borderRadius: 5,
          elevation: 5,
          zIndex: 9999,
          minWidth: 150,
          maxWidth: maxWidth - 40, // 디바이스 너비에서 40px의 여유 공간을 둠
        },
        tw`pb-2 px-1`,
      ]}>
      <View style={tw`flex-row justify-between`}>
        <TouchableOpacity onPress={onClose} style={tw`ml-auto px-1 my-1`}>
          <Text style={tw`text-[${designatedColor.GRAY4}] text-[6px]`}>
            닫기
          </Text>
        </TouchableOpacity>
      </View>

      <CustomText
        style={tw`text-[9px] text-[${designatedColor.GRAY1}] flex-grow mb-1 pl-1`}>
        {content}
      </CustomText>
    </View>
  );
};

const CustomTooltipInfo = ({text}: {text: string}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});
  const [iconPosition, setIconPosition] = useState({x: 0, y: 0, height: 0});
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);

  const {width: screenWidth} = useWindowDimensions(); // 디바이스 너비 가져오기

  // InfoIcon의 위치와 높이를 최초 렌더링 때 한 번만 저장합니다.
  const handleLayout = (event: LayoutChangeEvent) => {
    const {x, y, height} = event.nativeEvent.layout;
    setIconPosition({x, y, height});
    setTooltipPosition({
      x: x,
      y: y - height - 20, // 아이콘 위에 위치하도록 툴팁 높이만큼 빼줌
    });
    setIsPositionCalculated(true); // 위치가 계산되었음을 표시
  };

  return (
    <View style={tw`px-2`}>
      {tooltipVisible && isPositionCalculated && (
        <CustomTooltip
          visible={tooltipVisible}
          content={text}
          onClose={() => setTooltipVisible(false)}
          position={tooltipPosition}
          maxWidth={screenWidth} // 디바이스 너비 전달
        />
      )}
      <View onLayout={handleLayout}>
        <TouchableOpacity onPress={() => setTooltipVisible(true)}>
          <InfoIcon width={16} height={16} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export {CustomTooltip, CustomTooltipInfo};

import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  LayoutChangeEvent,
  useWindowDimensions,
} from 'react-native';
import InfoIcon from '../../assets/svg/Info.svg'; // 실제로 사용하고 있는 SVG 컴포넌트 경로를 수정
import CustomText from '../text/CustomText';
import tw from 'twrnc';
import {designatedColor} from '../../constants';

type CustomTooltipProps = {
  visible: boolean;
  content: string;
  position: {x: number; y: number};
  maxWidth: number; // 디바이스 너비를 전달받음
};

const CustomTooltip = ({
  visible,
  content,
  position,
  maxWidth,
}: CustomTooltipProps) => {
  if (!visible) {
    return null;
  }

  return (
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
          maxWidth: maxWidth - 40,
        },
        tw`py-3 px-1`,
      ]}>
      <CustomText
        style={tw`text-[9px] text-[${designatedColor.DARK_GRAY}] flex-grow mb-1 pl-1`}>
        {content}
      </CustomText>
    </View>
  );
};

const CustomTooltipInfo = ({text}: {text: string}) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});
  const [isPositionCalculated, setIsPositionCalculated] = useState(false);
  const {width: screenWidth} = useWindowDimensions();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (tooltipVisible) {
      timer = setTimeout(() => {
        setTooltipVisible(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [tooltipVisible]);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {x, y, height} = event.nativeEvent.layout;
    setTooltipPosition({
      x: x,
      y: y - height - 20,
    });
    setIsPositionCalculated(true);
  };

  const handleOverlayPress = () => {
    if (tooltipVisible) {
      setTooltipVisible(false);
    }
  };

  return (
    <View style={{flex: 1}}>
      {tooltipVisible && (
        // 오버레이 추가하여 외부 터치 감지
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'transparent', // 반투명으로 하면 배경 클릭이 가능
            zIndex: 9998,
          }}
          activeOpacity={1}
          onPress={handleOverlayPress}
        />
      )}
      <View style={tw`px-2`}>
        {tooltipVisible && isPositionCalculated && (
          <CustomTooltip
            visible={tooltipVisible}
            content={text}
            position={tooltipPosition}
            maxWidth={screenWidth}
          />
        )}
        <View onLayout={handleLayout}>
          <TouchableOpacity onPress={() => setTooltipVisible(true)}>
            <InfoIcon width={16} height={16} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export {CustomTooltip, CustomTooltipInfo};

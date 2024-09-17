// CustomText.tsx
import React from 'react';
import {Text as RNText, TextProps} from 'react-native';

const CustomText = (props: TextProps) => {
  return <RNText {...props} allowFontScaling={false} />;
};

export default CustomText;

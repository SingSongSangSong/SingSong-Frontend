import React from 'react';
import {View, Text, Dimensions} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';
import {designatedColor} from '../../constants';

const windowWidth = Dimensions.get('window').width;

const CustomToast = () => {
  const toastConfig: ToastConfig = {
    selectedToast: ({text1, props}) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 60,
          width: windowWidth - 30,
          backgroundColor: `${designatedColor.GREEN}`,
          padding: 4,
          borderRadius: 18,
        }}>
        <Text
          style={{
            color: 'white',
            fontFamily: 'Poppins-Regular',
          }}>
          {text1}
        </Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} />;
};

export {CustomToast};

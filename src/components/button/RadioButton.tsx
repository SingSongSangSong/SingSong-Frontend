import React, {useMemo, useState, useEffect} from 'react';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import {designatedColor} from '../../constants';
import tw from 'twrnc';

interface RadioButtonProp {
  handleOnPress: (reportReason: string) => void;
}

const RadioButton = ({handleOnPress}: RadioButtonProp) => {
  const initialRadioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        id: '1',
        label: '낚시/놀람/도배',
        value: '낚시/놀람/도배',
        color: designatedColor.GREEN,
        labelStyle: {color: 'white'},
        borderColor: 'gray',
      },
      {
        id: '2',
        label: '상업적 광고 및 판매',
        value: '상업적 광고 및 판매',
        color: designatedColor.GREEN,
        labelStyle: {color: 'white'},
        borderColor: 'gray',
      },
      {
        id: '3',
        label: '욕설/인신공격',
        value: '욕설/인신공격',
        color: designatedColor.GREEN,
        labelStyle: {color: 'white'},
        borderColor: 'gray',
      },
      {
        id: '4',
        label: '개인정보노출',
        value: '개인정보노출',
        color: designatedColor.GREEN,
        labelStyle: {color: 'white'},
        borderColor: 'gray',
      },
      {
        id: '5',
        label: '기타',
        value: '기타',
        color: designatedColor.GREEN,
        labelStyle: {color: 'white'},
        borderColor: 'gray',
      },
    ],
    [],
  );

  const [radioButtons, setRadioButtons] =
    useState<RadioButtonProps[]>(initialRadioButtons);
  const [selectedId, setSelectedId] = useState<string | undefined>();

  useEffect(() => {
    setRadioButtons(prevButtons =>
      prevButtons.map(button => ({
        ...button,
        borderColor: button.id === selectedId ? designatedColor.GREEN : 'gray',
      })),
    );
  }, [selectedId]);

  const handlePress = (selectedId: string) => {
    const selectedButton = radioButtons.find(
      button => button.id === selectedId,
    );
    if (selectedButton && selectedButton.value) {
      handleOnPress(selectedButton.value);
    }
    setSelectedId(selectedId);
  };

  return (
    <RadioGroup
      radioButtons={radioButtons}
      onPress={handlePress}
      selectedId={selectedId}
      layout="column"
      containerStyle={tw`items-start py-2`}
    />
  );
};

export {RadioButton};

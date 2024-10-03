import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  useWindowDimensions,
  Linking,
  ActivityIndicator,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamList} from '../../types';
import {appStackNavigations, designatedColor} from '../../constants';
import tw from 'twrnc';
import LogoBlackIcon from '../../assets/svg/logoBlack.svg';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import useTerms from '../../hooks/useTerms';
import CustomText from '../../components/text/CustomText';
import RadioGroup from 'react-native-radio-buttons-group';

type TermsScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.TERMS
>;

function TermsScreen(props: TermsScreenProps) {
  const termsHandler = useTerms({
    provider: props.route.params.provider,
    idToken: props.route.params.idToken,
    navigation: props.navigation,
  });

  const {width, height} = useWindowDimensions(); // 화면의 너비와 높이를 가져옴
  const isLandscape = width > height;

  return (
    <View style={tw`flex-1 items-center bg-white p-6`}>
      {!termsHandler.isNextStep ? (
        <View style={[tw`flex-1 pt-20`, isLandscape && tw`pt-2`]}>
          <View style={tw`flex-row items-center `}>
            <LogoBlackIcon width={59.04} height={30.96} />
            <CustomText style={tw`text-black text-xl font-bold ml-2`}>
              고객님 환영합니다!
            </CustomText>
          </View>
          <View style={tw`mt-10`}>
            {/* 조건에 따라 가로 크기를 동적으로 조절 */}
            <View
              style={[
                tw`flex-row items-center justify-between pb-3 mb-3 border-b-[0.5px]`,
                {borderColor: designatedColor.GRAY3, width: width * 0.9}, // 화면 너비의 90%를 사용
              ]}>
              <View style={tw`flex-row items-center`}>
                <CheckBox
                  value={termsHandler.isAllChecked}
                  onValueChange={termsHandler.handleAllChecked}
                  tintColors={{true: 'black'}}
                />
                <CustomText
                  style={tw`text-sm text-[${designatedColor.GRAY4}] ml-2`}>
                  약관 전체 동의
                </CustomText>
              </View>
            </View>

            {termsHandler.termsList.map((item, index) => (
              <View
                key={index}
                style={[
                  tw`flex-row justify-between items-center my-3`,
                  {width: width * 0.9}, // 화면 너비의 90%를 사용
                ]}>
                <View style={tw`flex-row items-center`}>
                  <CheckBox
                    value={termsHandler.terms[item.value]}
                    onValueChange={newValue =>
                      termsHandler.handleCheck(item.value, newValue)
                    }
                    tintColors={{true: 'black'}}
                  />
                  <CustomText
                    style={tw`text-sm text-[${designatedColor.GRAY4}] ml-2`}>
                    {item.label}
                  </CustomText>
                </View>
                <TouchableOpacity
                  style={tw`p-1`}
                  onPress={() => {
                    Linking.openURL(item.url);
                  }}>
                  <ArrowRightIcon />
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={[
              tw`mt-6 bg-[${designatedColor.GRAY2}] py-3 rounded-full items-center`,
              {
                position: 'absolute',
                bottom: 40,
                left: width * 0.05,
                right: width * 0.05,
              }, // 좌우 여백을 화면의 5%로 조정
              termsHandler.terms.termsOfService &&
                termsHandler.terms.personalInfo &&
                tw`bg-[${designatedColor.BLACK}]`,
            ]}
            disabled={
              !(
                termsHandler.terms.termsOfService &&
                termsHandler.terms.personalInfo
              )
            }
            onPress={() => {
              termsHandler.setIsNextStep(true);
            }}>
            <CustomText style={tw`text-white text-sm`}>다음</CustomText>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
          accessible={false}>
          <View style={[tw`flex-1 w-full pt-20`, isLandscape && tw`pt-2`]}>
            <View>
              <CustomText style={tw`text-black text-lg font-bold my-4 ml-2`}>
                출생연도와 성별을 입력해주세요
              </CustomText>

              <View style={tw`mx-3 mt-4`}>
                {/* 출생연도 입력 */}
                <View style={tw`flex-row items-center`}>
                  <View
                    style={tw`my-4 mr-4 w-[16] justify-center items-center`}>
                    <CustomText style={tw`text-black`}>출생연도</CustomText>
                  </View>

                  <TextInput
                    style={tw`flex-1 border border-gray-400 rounded p-2`}
                    placeholder="ex) 1990"
                    keyboardType="numeric"
                    value={termsHandler.birthYear}
                    onChangeText={termsHandler.setBirthYear}
                    maxLength={4}
                    autoFocus={true}
                  />
                </View>

                <View style={tw`flex-row items-center mt-2`}>
                  <View
                    style={tw`my-4 mr-4 w-[16] justify-center items-center`}>
                    <CustomText style={tw`text-black`}>성별</CustomText>
                  </View>

                  {/* 성별 선택 Radio 버튼 */}
                  <View style={tw`flex-row justify-around px-2 w-40`}>
                    <RadioGroup
                      radioButtons={termsHandler.radioButtons}
                      onPress={termsHandler.handleOnPressRadioButton}
                      selectedId={termsHandler.selectedId}
                      layout="row"
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* 완료 버튼 */}
            <TouchableOpacity
              style={[
                tw`mt-6 bg-[${designatedColor.GRAY2}] py-3 rounded-full items-center`,
                {
                  position: 'absolute',
                  bottom: 40,
                  left: width * 0.05,
                  right: width * 0.05,
                }, // 좌우 여백을 화면의 5%로 조정
                termsHandler.gender &&
                  termsHandler.birthYear &&
                  tw`bg-[${designatedColor.BLACK}]`,
              ]}
              onPress={termsHandler.handleOnPressSubmission}>
              <CustomText style={tw`text-white text-sm`}>완료</CustomText>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      )}
      {termsHandler.isLoggedProcess && (
        <View
          style={tw`absolute top-0 left-0 right-0 bottom-0 justify-center items-center`}>
          <ActivityIndicator size="large" color="#D2E0FB" />
        </View>
      )}
    </View>
  );
}

export default TermsScreen;

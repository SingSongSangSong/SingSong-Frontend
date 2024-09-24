import React from 'react';
import {Text, View, TouchableOpacity, TextInput, Keyboard} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import {StackScreenProps} from '@react-navigation/stack';
import {AppStackParamList} from '../../types';
import {appStackNavigations, designatedColor} from '../../constants';
import tw from 'twrnc';
import LogoBlackIcon from '../../assets/svg/logoBlack.svg';
import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import useTerms from '../../hooks/useTerms';
import CustomText from '../../components/text/CustomText';

type TermsScreenProps = StackScreenProps<
  AppStackParamList,
  typeof appStackNavigations.TERMS
>;

function TermsScreen(props: TermsScreenProps) {
  const termsHandler = useTerms({
    provider: props.route.params.provider,
    idToken: props.route.params.idToken,
  });

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      {!termsHandler.isNextStep ? (
        <>
          <View style={tw`ml-4 mt-25`}>
            <View style={tw`flex-row items-center`}>
              <LogoBlackIcon width={59.04} height={30.96} />
              <CustomText style={tw`text-black text-xl font-bold ml-2`}>
                고객님 환영합니다!
              </CustomText>
            </View>
          </View>
          <View style={tw`mt-10 ml-4`}>
            <View
              style={tw`flex-row items-center justify-between pb-3 mb-3 border-b-[0.5px] border-[${designatedColor.GRAY3}]`}>
              <View style={tw`flex-row items-center`}>
                <CheckBox
                  value={termsHandler.isAllChecked}
                  onValueChange={termsHandler.handleAllChecked}
                  tintColors={{true: 'black'}}
                />
                <CustomText style={tw`text-sm text-[${designatedColor.GRAY4}]`}>
                  약관 전체 동의
                </CustomText>
              </View>
            </View>

            <View style={tw`flex-row justify-between items-center my-3`}>
              <View style={tw`flex-row items-center`}>
                <CheckBox
                  value={termsHandler.terms.termsOfService}
                  onValueChange={newValue =>
                    termsHandler.handleCheck('termsOfService', newValue)
                  }
                  tintColors={{true: 'black'}}
                />
                <CustomText style={tw`text-sm text-[${designatedColor.GRAY4}]`}>
                  [필수] 이용약관 동의
                </CustomText>
              </View>
              <TouchableOpacity style={tw`p-1`}>
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center justify-between my-3`}>
              <View style={tw`flex-row items-center`}>
                <CheckBox
                  value={termsHandler.terms.personalInfo}
                  onValueChange={newValue =>
                    termsHandler.handleCheck('personalInfo', newValue)
                  }
                  tintColors={{true: 'black'}}
                />
                <CustomText style={tw`text-sm text-[${designatedColor.GRAY4}]`}>
                  [필수] 개인정보 수집 및 이용 동의
                </CustomText>
              </View>
              <TouchableOpacity style={tw`p-1`}>
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center justify-between my-3`}>
              <View style={tw`flex-row items-center`}>
                <CheckBox
                  value={termsHandler.terms.thirdPartyInfo}
                  onValueChange={newValue =>
                    termsHandler.handleCheck('thirdPartyInfo', newValue)
                  }
                  tintColors={{true: 'black'}}
                />
                <CustomText style={tw`text-sm text-[${designatedColor.GRAY4}]`}>
                  [선택] 제 3자 정보 제공 동의
                </CustomText>
              </View>
              <TouchableOpacity style={tw`p-1`}>
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center justify-between my-3`}>
              <View style={tw`flex-row items-center`}>
                <CheckBox
                  value={termsHandler.terms.marketingInfo}
                  onValueChange={newValue =>
                    termsHandler.handleCheck('marketingInfo', newValue)
                  }
                  tintColors={{true: 'black'}}
                />
                <Text style={tw`text-sm text-[${designatedColor.GRAY4}]`}>
                  [선택] 마케팅 정보 수신 동의
                </Text>
              </View>
              <TouchableOpacity style={tw`p-1`}>
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>

            <View style={tw`flex-row items-center justify-between my-3`}>
              <View style={tw`flex-row items-center`}>
                <CheckBox
                  value={termsHandler.terms.locationInfo}
                  onValueChange={newValue =>
                    termsHandler.handleCheck('locationInfo', newValue)
                  }
                  tintColors={{true: 'black'}}
                />
                <CustomText style={tw`text-sm text-[${designatedColor.GRAY4}]`}>
                  [선택] 광고성 정보 수신 동의
                </CustomText>
              </View>
              <TouchableOpacity style={tw`p-1`}>
                <ArrowRightIcon />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            style={[
              tw`mt-6 bg-[${designatedColor.GRAY2}] py-3 mx-10 rounded-full items-center`,
              {position: 'absolute', bottom: 40, left: 0, right: 0},
              termsHandler.terms.termsOfService &&
                termsHandler.terms.personalInfo &&
                tw`bg-[${designatedColor.BLACK}]`,
            ]}
            onPress={() => {
              termsHandler.setIsNextStep(true);
            }}>
            <CustomText style={tw`text-white text-sm`}>다음</CustomText>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={tw`ml-4 mt-25`}>
            <CustomText style={tw`text-black text-lg font-bold my-4`}>
              출생연도와 성별을 입력해주세요
            </CustomText>
            <View style={tw`mx-3`}>
              {/* 출생연도 입력 */}
              <View style={tw`flex-row items-center`}>
                <View style={tw`my-4 mr-4 w-[16] justify-center items-center`}>
                  <CustomText style={tw`text-black`}>출생연도</CustomText>
                </View>
                <TextInput
                  style={tw`border border-gray-400 rounded p-2 w-40`}
                  placeholder="ex) 1990"
                  keyboardType="numeric"
                  value={termsHandler.birthYear}
                  onChangeText={termsHandler.setBirthYear}
                  maxLength={4}
                  autoFocus={true}
                />
              </View>
              <View style={tw`flex-row items-center`}>
                <View style={tw`my-4 mr-4 w-[16] justify-center items-center`}>
                  <CustomText style={tw`text-black`}>성별</CustomText>
                </View>

                <View style={tw`flex-row justify-around px-2 w-40`}>
                  <TouchableOpacity
                    style={[
                      tw`px-4 py-2 rounded mr-4`,
                      termsHandler.gender === 'MALE'
                        ? tw`bg-black`
                        : tw`bg-gray-300`,
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      //   termsHandler.handleGenderToggle('MALE');
                    }}>
                    <CustomText style={tw`text-white text-center`}>
                      남성
                    </CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      tw`px-4 py-2 rounded`,
                      termsHandler.gender === 'FEMALE'
                        ? tw`bg-black`
                        : tw`bg-gray-300`,
                    ]}
                    onPress={() => {
                      Keyboard.dismiss();
                      //   termsHandler.handleGenderToggle('FEMALE');
                    }}>
                    <CustomText style={tw`text-white text-center`}>
                      여성
                    </CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          {/* <TouchableOpacity
            style={tw`my-6 mx-8 bg-black p-2 rounded`}
            activeOpacity={0.8}
            // onPress={handleOnModalCloseButton}
          >
            <CustomText style={tw`text-white font-bold text-center`}>
              완료
            </CustomText>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[
              tw`mt-6 bg-[${designatedColor.GRAY2}] py-3 mx-10 rounded-full items-center`,
              {position: 'absolute', bottom: 40, left: 0, right: 0},
              termsHandler.terms.termsOfService &&
                termsHandler.terms.personalInfo &&
                tw`bg-[${designatedColor.BLACK}]`,
            ]}
            onPress={() => {
              termsHandler.setIsNextStep(true);
            }}>
            <CustomText style={tw`text-white text-sm`}>완료</CustomText>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default TermsScreen;

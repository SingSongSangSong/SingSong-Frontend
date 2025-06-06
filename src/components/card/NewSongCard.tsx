import React, {useState} from 'react';
import {Dimensions, Image, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import {CommonTag} from '..';
import CustomText from '../text/CustomText';
// import ArrowRightIcon from '../../assets/svg/arrowRight.svg';
import WhiteLogoIcon from '../../assets/svg/whiteLogo.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

type NewSongCardProps = {
  songName: string;
  singerName: string;
  songNumber: number;
  onSongPress: () => void;
  album: string;
  melonLink?: string;
  isMr: boolean;
  isLive: boolean;
  isRecentlyUpdated: boolean;
};

const NewSongCard = ({
  songName,
  singerName,
  songNumber,
  onSongPress,
  album,
  melonLink,
  isMr,
  isLive,
  isRecentlyUpdated,
}: NewSongCardProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const cardWidth = deviceWidth * 0.3;
  // console.log('album', album);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <TouchableOpacity
        style={tw`mx-0.5`}
        onPress={onSongPress}
        activeOpacity={1}>
        {album != '' ? (
          // <View
          //   style={[
          //     {
          //       width: cardWidth,
          //       height: cardWidth,
          //     },
          //     tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY4}]`,
          //   ]}>
          <View
            // <TouchableOpacity
            style={[
              {
                width: cardWidth,
                height: cardWidth,
              },
              tw`m-1 rounded-sm justify-center items-center`,
            ]}
            // onPress={() => {
            //   setIsModalVisible(true);
            // }}
            // activeOpacity={1.0}
          >
            <Image
              source={{uri: album}}
              style={[
                tw`rounded-md`,
                {
                  width: cardWidth,
                  height: cardWidth,
                },
              ]}
            />
            {/* </TouchableOpacity> */}
          </View>
        ) : (
          // </View>
          <View
            style={[
              {
                backgroundColor: 'rgba(0, 0, 0, 1)',
                width: cardWidth,
                height: cardWidth,
              },
              tw`m-1 rounded-lg justify-center items-center border border-[${designatedColor.GRAY5}]`,
            ]}>
            <WhiteLogoIcon width={108} height={76} />
          </View>
        )}

        <View style={tw`flex-row m-1`}>
          <View
            style={tw`px-2 py-0.5 border border-[${designatedColor.VIOLET}] rounded-full`}>
            <CustomText
              style={tw`text-[${designatedColor.VIOLET}] text-center text-[10px]`}>
              {songNumber}
            </CustomText>
          </View>
        </View>
        <View style={tw`m-1 mt-0 ml-2 flex-row items-center`}>
          <View>
            <View
              style={[tw`flex-row items-center my-0.5`, {width: cardWidth}]}>
              {isRecentlyUpdated && (
                <CommonTag name="NOW" color={designatedColor.MINT} />
              )}
              {isMr && <CommonTag name="MR" color={designatedColor.PURPLE} />}
              {isLive && (
                <CommonTag name="LIVE" color={designatedColor.ORANGE} />
              )}
              <CustomText
                style={[
                  tw`text-white text-[11px] mr-1 flex-1`, // flex-1로 공간을 차지하도록 설정
                ]}
                numberOfLines={1} // 최대 한 줄로 표시되도록 설정
                ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
              >
                {songName}
              </CustomText>
              {/* <ArrowRightIcon width={16} height={16} /> */}
            </View>

            <CustomText
              style={[
                tw`text-[${designatedColor.GRAY3}] text-[11px] mt-1`,
                {width: cardWidth}, // 카드의 너비에 맞추어 텍스트 너비 설정
              ]}
              numberOfLines={1} // 최대 한 줄로 표시되도록 설정
              ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
            >
              {singerName}
            </CustomText>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export {NewSongCard};

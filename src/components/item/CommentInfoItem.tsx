import React from 'react';
import {Dimensions, TouchableOpacity, View} from 'react-native';
import tw from 'twrnc';
import {designatedColor} from '../../constants';
import CustomText from '../text/CustomText';
import CommentIcon from '../../assets/svg/commentGray.svg';
import {formatDateComment} from '../../utils';

type CommentInfoItemProps = {
  songName: string;
  singerName: string;
  songNumber: number;
  onCommentPress: () => void;
  nickname: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked: boolean;
};

const CommentInfoItem = ({
  songName,
  singerName,
  songNumber,
  onCommentPress,
  nickname,
  content,
  createdAt,
  likes,
  isLiked,
}: CommentInfoItemProps) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const commentWidth = deviceWidth * 0.6;
  //   const commentHeight = deviceHeight * 0.1;

  return (
    <>
      <TouchableOpacity
        style={[
          tw`mr-2 mt-4 bg-[${designatedColor.BACKGROUND_GRAY}] rounded-lg justify-center px-4 py-4`,
          //   {
          //     width: commentWidth,
          //     // height: commentHeight,
          //   },
        ]}
        onPress={onCommentPress}
        activeOpacity={1}>
        <View style={tw`flex-row items-center justify-between`}>
          <View style={tw`flex-row items-center`}>
            <CommentIcon width={16} height={16} />
            <CustomText
              style={tw`text-[13px] text-[${designatedColor.VIOLET3}] leading-[16px] px-2`}
              numberOfLines={2}
              ellipsizeMode="tail">
              {nickname}
            </CustomText>
            <CustomText
              style={tw`text-[13px] text-[${designatedColor.WHITE}] leading-[16px] pr-1`}
              numberOfLines={2}
              ellipsizeMode="tail">
              {content}
            </CustomText>
          </View>
        </View>
        <View style={tw`flex-row items-center mt-2 justify-between`}>
          <CustomText
            style={tw`text-[12px] text-[${designatedColor.GRAY1}] leading-[16px] pr-1`}
            numberOfLines={2}
            ellipsizeMode="tail">
            {formatDateComment(createdAt)}
          </CustomText>
          <View style={tw`flex-row items-center`}>
            <CustomText
              style={tw`text-[11px] text-[${designatedColor.VIOLET3}] leading-[16px] pr-2`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {songNumber}
            </CustomText>
            <CustomText
              style={tw`text-[11px] text-[${designatedColor.GRAY1}] leading-[16px] pr-1 flex-shrink overflow-hidden`}
              numberOfLines={1}
              ellipsizeMode="tail">
              {songName}
            </CustomText>
          </View>
        </View>

        {/* <View style={tw`flex-row m-1`}>
          <View
            style={tw`px-2 py-0.5 border border-[${designatedColor.VIOLET}] rounded-full`}>
            <CustomText
              style={tw`text-[${designatedColor.VIOLET}] text-center text-[10px]`}>
              {songNumber}
            </CustomText>
          </View>
        </View> */}
        {/* <View style={tw`m-1 mt-0 ml-2 flex-row items-center`}>
          <View>
            <View
              style={[tw`flex-row items-center my-0.5`, {width: cardWidth}]}>
              <CustomText
                style={[
                  tw`text-white text-[11px] mr-1 flex-1`, // flex-1로 공간을 차지하도록 설정
                ]}
                numberOfLines={1} // 최대 한 줄로 표시되도록 설정
                ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
              >
                {songName}
              </CustomText>
              <ArrowRightIcon width={16} height={16} />
            </View>

            <CustomText
              style={[
                tw`text-[${designatedColor.GRAY3}] text-[11px]`,
                {width: cardWidth}, // 카드의 너비에 맞추어 텍스트 너비 설정
              ]}
              numberOfLines={1} // 최대 한 줄로 표시되도록 설정
              ellipsizeMode="tail" // 텍스트가 넘칠 경우 말줄임표(...)로 표시
            >
              {singerName}
            </CustomText>
          </View>
        </View> */}
      </TouchableOpacity>
    </>
  );
};

export {CommentInfoItem};

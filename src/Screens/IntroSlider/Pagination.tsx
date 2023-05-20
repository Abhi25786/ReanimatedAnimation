import React, {FC, memo} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {widthAnimation} from './AnimatedFunctions';
const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;
interface pageProps {
  translateX: Animated.SharedValue<number>;
  cruntIndex: number;
  inactiveDotWidth: number;
  activeDotWidth: number;
  inactiveDotColor: string;
  activeDotColor: string;
  data: Array<object>;
  contentOffset: number;
  scrollElementHeightPercent: number;
  scrollIndecatorHeight:number
}

const Pagination: FC<pageProps> = ({
  data,
  translateX,
  inactiveDotWidth = 10,
  activeDotWidth = 29,
  cruntIndex,
  inactiveDotColor = 'gray',
  activeDotColor = 'black',
  contentOffset,
  scrollElementHeightPercent,
  scrollIndecatorHeight=5
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: height / 2.85,
        right: 0,
        left: 0,
      }}>
      {data.length < 10 ? (
        data?.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = [
            inactiveDotWidth,
            activeDotWidth,
            inactiveDotWidth,
          ];
          return (
            <Animated.View
              style={[
                {
                  height: 10,
                  borderRadius: 10,
                  marginHorizontal: 4,
                  backgroundColor:
                    cruntIndex == index + 1 ? activeDotColor : inactiveDotColor,
                },
                widthAnimation(translateX, inputRange, outputRange),
              ]}
              key={index.toString()}
            ></Animated.View>
          );
        })
      ) : (
        <Animated.View
          style={{
            height: scrollIndecatorHeight,
            backgroundColor: inactiveDotColor,
            marginTop: 10,
            width: 100,
          }}>
          <Animated.View
            style={{
              height: scrollIndecatorHeight,
              backgroundColor: activeDotColor,
              transform: [{translateX: contentOffset}],
              width: `${scrollElementHeightPercent}%`,
            }}
          />
        </Animated.View>
      )}
    </View>
  );
};
export default memo(Pagination);

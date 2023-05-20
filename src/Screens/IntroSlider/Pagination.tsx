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
  index: number;
  translateX: Animated.SharedValue<number>;
  cruntIndex: number;
  inactiveDotWidth: number;
  activeDotWidth: number;
  inactiveDotColor: string;
  activeDotColor: string;
}

const Pagination: FC<pageProps> = ({
  index,
  translateX,
  inactiveDotWidth = 10,
  activeDotWidth = 29,
  cruntIndex,
  inactiveDotColor = 'gray',
  activeDotColor = 'black',
}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const outputRange = [inactiveDotWidth, activeDotWidth, inactiveDotWidth];

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
      ]}></Animated.View>
  );
};
export default memo(Pagination);

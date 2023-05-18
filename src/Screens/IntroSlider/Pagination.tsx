import React, {FC, memo} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;
interface pageProps {
  item: object
  index: number;
  translateX: Animated.SharedValue<number>;
  cruntIndex: number;
}

const Pagination: FC<pageProps> = ({item, index, translateX, cruntIndex}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const reanimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateX.value,
      inputRange,
      [10, 29, 10],
      Extrapolate.CLAMP,
    );
    const color = interpolate(
      translateX.value,
      inputRange,
      [128, 0, 128],
      Extrapolate.CLAMP,
    );

    return {
      width,
      height: 10,
      borderRadius: 10,
      marginHorizontal: 4,
      backgroundColor: `rgb(${color},${color},${color})`,
    };
  });

  return <Animated.View style={[reanimatedStyle]}></Animated.View>;
};
export default memo(Pagination);

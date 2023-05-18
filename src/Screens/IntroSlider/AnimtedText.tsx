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
  item:object;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const AnimtedText: FC<pageProps> = ({item, index, translateX, cruntIndex}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const reanimatedStyle = useAnimatedStyle(() => {
    return {};
  });
  const textStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translateX.value,
      inputRange,
      [10, 30, 10],
      Extrapolate.CLAMP,
    );
    const translateXValue = interpolate(
      translateX.value,
      inputRange,
      [width * 1.1, 0, -width],
      Extrapolate.CLAMP,
    );

    return {
      fontSize,
      position: 'absolute',
      transform: [{translateX: translateXValue}],
    };
  });

  return <Animated.Text style={textStyle}>{item.text}</Animated.Text>;
};
export default memo(AnimtedText);
const styles = StyleSheet.create({});

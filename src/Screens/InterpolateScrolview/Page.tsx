import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;
interface pageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}

const Page: FC<pageProps> = ({ title, index, translateX }) => {
    const inputRange=  [(index - 1) * width, index * width, (index + 1) * width]
  const reanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
        translateX.value,
        inputRange
    ,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
      borderRadius: borderRadius,
    };
  });
    const testAnimatedStyle = useAnimatedStyle(() => {
        const translateY = interpolate(translateX.value, inputRange, [height / 2, 0, -height / 2],    Extrapolate.CLAMP,)
        const opacity= interpolate(translateX.value,inputRange,[-2,1,-2],    Extrapolate.CLAMP,)

        return {opacity,
            transform:[{translateY}]
        }
    })
  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.View style={[reanimatedStyle, styles.squareView]} />
      <Animated.View style={[{position: 'absolute'},testAnimatedStyle]}>
        <Text style={styles.textStyle}>{title}</Text>
      </Animated.View>
    </View>
  );
};
export {Page};
const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareView: {
    height: SIZE,
    width: SIZE,
    backgroundColor: 'blue',
  },
  textStyle: {
    color: 'white',
    fontSize: 32,
  },
});

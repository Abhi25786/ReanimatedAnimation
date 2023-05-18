import React, {FC} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Pagination from './Pagination';
const {height, width} = Dimensions.get('window');
const SIZE = width * 0.7;
interface pageProps {
  item: any
  index: number;
  translateX: Animated.SharedValue<number>;
}

const CradView: FC<pageProps> = ({item, index, translateX}) => {

  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const reanimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.9, 1, 0.9],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale}],
    };
  });

  return (
    <View
      style={[
        styles.pageContainer,
        {backgroundColor: `rgba(0,0,256,0.${index + 2})`},
      ]}>
      <Animated.Image
        source={{uri: item?.uri}}
        style={[{height: height / 1.7, width: width}, reanimatedStyle]}
      />

    </View>
  );
};
export default CradView;
const styles = StyleSheet.create({
  pageContainer: {
    height,
    width,
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

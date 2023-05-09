import React, {FC} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
const SIZE = width / 5;
interface pageProps {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
}
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const Page: FC<pageProps> = ({title, index, translateX}) => {
  const openClose = useSharedValue(0);
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const reanimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(
      translateX.value,
      inputRange,
      [0, 40, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius: borderRadius,
      width: `${width}%`,
      height: SIZE / 1.4,
      backgroundColor: 'green',
      marginTop: 10,
    };
  });
  const testAnimatedStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      translateX.value,
      inputRange,
      [0, 16, 0],
      Extrapolate.CLAMP,
    );

    return {
      fontSize,
    };
  });
    const closeAnimation = useAnimatedStyle(() => {
        const opacity = interpolate(
            openClose.value,
            inputRange,
            [0, 1, 0],
            Extrapolate.CLAMP,
          );
        return {
            opacity
    };
  });
  const onPress = (val: number) => {
    openClose.value = withTiming(val);
  };
  return (
    <View style={[styles.pageContainer, {backgroundColor: `transparent`}]}>
      {/* <Animated.View
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
            position: 'absolute',
                top: 35,
            backgroundColor:'green'
          },
          closeAnimation,
              ]}
       
          >
        <Animated.Text>sadcc</Animated.Text>
      </Animated.View> */}

      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          zIndex: 1,
          top: 10,
              }}
              
              onTouchStart={()=>onPress(1)}>
        <Animated.View
          style={[
            {alignItems: 'center', justifyContent: 'center'},
            reanimatedStyle,
          ]}>
          <Animated.Text style={testAnimatedStyle}>sadcasdc</Animated.Text>
        </Animated.View>
      </Animated.View>
      <Animated.View style={[styles.squareView, {zIndex: 0},closeAnimation]}></Animated.View>
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  pageContainer: {
    height: height / 2.5,
    width: width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareView: {
    height: height / 2.6,
    width: width - 30,
    backgroundColor: 'white',
    borderRadius: 16,
  },
  textStyle: {
    color: 'white',
    fontSize: 32,
  },
});

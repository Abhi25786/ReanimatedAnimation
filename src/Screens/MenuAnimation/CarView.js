import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);

const CarView = ({ item, index, curIndex, onPress = () => { } }) => {
  console.log(curIndex, index, 'd');
  const animated = useSharedValue(0);
  const InputRange = [0, 1, 0];

  useEffect(() => {
    if (index == curIndex) {
      animated.value = withTiming(1);
      return;
    }
    animated.value = withTiming(0);
  }, [curIndex]);

  const viewStyle = useAnimatedStyle(() => {
    const hight = interpolate(
      animated?.value,
      InputRange,
      [100, 200, 100],
      Extrapolate.CLAMP,
    );
    const borderWidth = interpolate(
      animated?.value,
      InputRange,
      [0, 3, 0],
      Extrapolate.CLAMP,
    );
    return {
      height: hight,
      borderWidth,
      borderRadius: 20,
      width: width - 20,
      backgroundColor: index == curIndex ? 'pink' : 'white',
      // borderWidth: index == curIndex ? 2 : 0,
      alignSelf: 'center',
      flexDirection: 'row',
      overflow: 'hidden',
      marginHorizontal: 20,
      flexWrap: 'wrap',
    };
  });

  const imageViewStyle = useAnimatedStyle(() => {
    const widthV = interpolate(
      animated?.value,
      InputRange,
      [30, 100, 30],
      Extrapolate.CLAMP,
    );
    const heightv = interpolate(
      animated?.value,
      InputRange,
      [100, 70, 100],
      Extrapolate.CLAMP,
    );

    const paddingTop = interpolate(
      animated?.value,
      InputRange,
      [15, 10, 15],
      Extrapolate.CLAMP,
    );

    return {
      width: `${widthV}%`,
      height: `${heightv}%`,
      paddingTop,
      alignItems: 'center',
    };
  });

  const animatedImageStyle = useAnimatedStyle(() => {
    const widthSize = interpolate(
      animated?.value,
      InputRange,
      [50, 30, 50],
      Extrapolate.CLAMP,
    );
    return {
      height: '70%',
      width: `${widthSize}%`,
      resizeMode: 'cover',
    };
  });

  const viewText = useAnimatedStyle(() => {
    const animatedwidth = interpolate(
      animated?.value,
      InputRange,
      [70, 100, 70],
      Extrapolate.CLAMP,
    );
    const hightV = interpolate(
      animated?.value,
      InputRange,
      [100, 38, 100],
      Extrapolate.CLAMP,
    );
    const translateX = interpolate(
      animated?.value,
      InputRange,
      [width / 4, 0, width / 4],
      Extrapolate.CLAMP,
    );
    const translateY = interpolate(
      animated?.value,
      InputRange,
      [0, 120, 0],
      Extrapolate.CLAMP,
    );
    const paddingTop = interpolate(
      animated?.value,
      InputRange,
      [8, 0, 8],
      Extrapolate.CLAMP,
    );
    const paddingHorizontal = interpolate(
      animated?.value,
      InputRange,
      [0, 20, 0],
      Extrapolate.CLAMP,
    );
    return {
      width: `${animatedwidth}%`,
      height: `${hightV}%`,
      paddingTop,
      paddingHorizontal,
      transform: [{ translateX: translateX }, { translateY: translateY }],
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={viewStyle}
      onPress={onPress}
      activeOpacity={1}>
      <Animated.View style={imageViewStyle}>
        <AnimatedImage
          source={{
            uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
          }}
          style={animatedImageStyle}
        />
      </Animated.View>
      <Animated.View
        style={[
          {
            position: 'absolute',
          },
          viewText,
        ]}>
        <View
          style={{

            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text style={[{ fontSize: 20, marginTop: 4 }]}>Car Go</Text>

          <Text style={[{ fontSize: 20 }]}>₹ 30,59</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            marginTop: -20
          }}>
          <Text style={[{ fontSize: 16, }]}>20 mins{curIndex == index ? '. 4 min away' : ''}</Text>

          <Text style={{ fontSize: 16, textDecorationLine: 'line-through' }}>₹ 40.59</Text>
        </View>
      </Animated.View>
    </AnimatedTouchableOpacity>
  );
};

export default CarView;

const styles = StyleSheet.create({});

import {Image, StyleSheet, Text, View} from 'react-native';
import React, {memo, useEffect} from 'react';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const AnimatedImage = Animated.createAnimatedComponent(Image);

const ImageRotation = () => {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(360, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
    );
    return () => cancelAnimation(progress);
  }, []);
  const reanimatedStyle = useAnimatedStyle(() => {
   

    return {
      transform: [{rotate: `${progress.value}deg`}],
    };
  }, []);
  const Size = 100;
  return (
    <GestureHandlerRootView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
       
        <AnimatedImage
          source={require('../../../offer.png')}
          style={[{height: Size, width: Size,tintColor:'red'}, reanimatedStyle]}
        />
        <Text style={{position: 'absolute', bottom: '40%'}}>sad</Text>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default memo(ImageRotation);

const styles = StyleSheet.create({});

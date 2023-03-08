import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// const AnimatedImage = Animated.createAnimatedComponent(Image);

const ImageRotation = () => {
      const progress = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    const style = interpolate(progress.value, [0, 1], [0, 360]);
    console.log(style);

    return {
      transform: [{rotate: `${style}deg`}],
    };
  }, []);
  useEffect(() => {
    progress.value = withRepeat(withTiming(1, {duration: 1600}), -1);
  }, [progress.value]);

  const Size = 100;
  return (
     <GestureHandlerRootView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        
      <Animated.View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={[
            {backgroundColor: 'red', height: Size, width: Size},
            reanimatedStyle,
          ]}
        />
        {/* <AnimatedImage
          source={require('./offer.png')}
          style={[
            {backgroundColor: 'red', height: Size, width: Size},
            reanimatedStyle,
          ]}
        /> */}
        <Text style={{position: 'absolute', bottom: '40%'}}>sad</Text>
      </Animated.View>
    </GestureHandlerRootView>
  )
}

export default memo(ImageRotation)

const styles = StyleSheet.create({})
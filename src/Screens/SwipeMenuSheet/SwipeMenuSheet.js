import { Alert, Dimensions, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
const {height,width} = Dimensions.get('window')
const SwipeMenuSheet = ({selectedId,setSelectedId}) => {
     const useAnimatedValue =  useSharedValue(0)
     useEffect(() => {
       if (selectedId) {
         useAnimatedValue.value = withTiming(1);
       } else {
         useAnimatedValue.value = withTiming(0);
       }
     }, [selectedId]);
     
     const animatedStyle = useAnimatedStyle(() => {
       const animatedWidth = interpolate(
         useAnimatedValue.value,
         [0, 1, 0],
         [0, width / 1.3, 0],
       );
       const opacity = interpolate(
        useAnimatedValue.value,
        [0, 1, 0],
        [0, 1, 0],
      );
       return {
         width: animatedWidth,
         opacity
       };
     },[selectedId]);
  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          zIndex: 100,
          height: height,
          backgroundColor: 'red',
          marginTop: height / 16,
        },
        animatedStyle,
      ]}>
      <Text
        style={{paddingHorizontal: 10, paddingTop: 10}}
        onPress={setSelectedId}>
        back
      </Text>
    </Animated.View>
  );
}

export default SwipeMenuSheet


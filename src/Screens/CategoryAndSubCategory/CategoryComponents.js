import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const CategoryComponents = ({item, animatedValue, onPress =()=>{},index,mainAniation=false }) => {
  const reanimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedValue.value,
      [0,1,0],
      [height * 1.2,0,height * 1.2],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ translateY }],
    };
  }, [animatedValue]); 

  return (
    <Animated.View style={[styles.twoView, reanimatedStyle,]}>
      <TouchableOpacity
        style={[
          {
            height: 150,
            backgroundColor: 'red',
            width: '90%',
            borderRadius: width / 3,
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          },
        ]}
        onPress={onPress}
      >
        <Text>{item.id}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default CategoryComponents;

const styles = StyleSheet.create({
  twoView: {
    width: width/2.4,
    marginHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

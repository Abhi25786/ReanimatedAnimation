import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, memo, useEffect} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

const SIZE = 90;

const RenderCircle = ({
  item,
  index,
  onPressCategory = () => {},
  customStyle = () => {},
  animationSpeed = 200,
  scaleAnimation,
}) => {
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleAnimation.value}],
    };
  });
  return (
    <Animated.View style={[customStyle(), reanimatedStyle]}>
      <TouchableOpacity
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={styles.circularView}
          onPress={() => onPressCategory()}>
          <Text style={[styles.categoryText]}>{item?.id}</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default memo(RenderCircle);

const styles = StyleSheet.create({
  circularView: {
    height: width / 3.8,
    width: width / 3.8,

    borderRadius: width / 7.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularListImage: {height: 32, width: 32},
  categoryText: {
    color: 'gray',
    fontSize: 10,
    textAlign: 'center',
    width: 64,
    paddingTop: 5,
  },
});

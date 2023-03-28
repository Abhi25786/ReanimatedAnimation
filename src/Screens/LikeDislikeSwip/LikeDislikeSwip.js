import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, { useState } from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const {height, width} = Dimensions.get('window');
const LikeDislikeSwip = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
const [state,setState]=useState(null)
  const _gestureHandler = useAnimatedGestureHandler({

   
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;

    },
    onEnd: (_, context) => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });

  const SwipeGesture = ({item, index}) => {
    return (

       <PanGestureHandler onGestureEvent={_gestureHandler}>
          <Animated.View
            style={[
              {
                backgroundColor: 'red',
                height: height / 2,
                width: width - 100,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 30,
                position:'absolute'
              },
              animatedStyle,
            ]}>
            <Text>{index}</Text>
          </Animated.View>
        </PanGestureHandler>

        )
  }
  return (
   
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      {[...Array(6)].map((item, index) => <SwipeGesture item={item} index={index} key={index.toString()} />).reverse()}
    </View>
  );
};

export default LikeDislikeSwip;

const styles = StyleSheet.create({});

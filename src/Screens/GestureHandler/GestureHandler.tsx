import React from 'react';
import {View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import styleFun from './styles';
const SIZE = 90;
const CIRCLE_RADIOUS = SIZE * 2;

export default function GestureHandler() {
    const styles = styleFun({ SIZE, CIRCLE_RADIOUS });
    // -------------ContextType is use for  assign the typescrip  value 
  type ContextType = {
    translateX: number;
    translateY: number;
  };
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    //   ----------------initial state of your view-----------
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    //   ----------------onActive is show where your view is move -----------

    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    //   ----------------onEnd is use for end of the animation  -----------

    onEnd: () => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      if (distance < CIRCLE_RADIOUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  });
  return (
    <View style={styles.mainContainer}>
      {
        //   ----------------panGestureEvent is use for move the view and give you the position of the view -----------
      }
      <View style={styles.circleView}>
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View style={[styles.square, reanimatedStyle]} />
        </PanGestureHandler>
      </View>
    </View>
  );
}

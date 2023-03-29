import {Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');
const AnimatedTochableOpacity=Animated.createAnimatedComponent(TouchableOpacity)
const LikeDislikeSwip = () => {
  const [state, setState] = useState([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);
  const card_Width = width - 100;
  const side = card_Width / 1.2;
  const SnapPoint = [-side, 0, side];

  type propType = {
    index: number;
    item: any;
    onSwipeUp: () => void;
  };
  const SwipeGesture: FC<propType> = ({item, index, onSwipeUp = () => {}}) => {
    const translateX = useSharedValue(0);
    const scale = useSharedValue(0);
    type ContextType = {
      translationX: number;
      translationY: number;
    };
    const _gestureHandler = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      ContextType
    >({
      onStart: (_, context) => {
        context.translationX = translateX.value;
      },
      onActive: (event, context) => {
        translateX.value = withTiming(
          event.translationX + context.translationX,
        );
        scale.value=withSpring(1)
      },
      onEnd: (event, context) => {
  
        if (event.translationX > side) {
          try {
            runOnJS(onSwipeUp)(true);
          } catch (error) {
            alert('error');
          }
        } else if (event.translationX < -side) {
          try {
            runOnJS(onSwipeUp)(false);
          } catch (error) {
            alert('error');
          }
        } else {
          translateX.value = withSpring(0);
          scale.value=withSpring(0)
        }
      },
    });
    const animatedStyle = useAnimatedStyle(() => {
      const rotate = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [-10, 0, 10],
        Extrapolate.CLAMP,
      );
      const scaleView = interpolate(
        scale.value,
        [0, 1, 0],
        [1 ,1.2, 1],
        Extrapolate.CLAMP,
      );
     
      return {
        transform: [{translateX: translateX.value}, {rotate: `${rotate}deg`},{scale:scaleView}],
      };
    });
    const updatingValue = (val) => {
      scale.value=withSpring(val)
    }
    return (
      <PanGestureHandler onGestureEvent={_gestureHandler}>
        <AnimatedTochableOpacity
          style={[
            {
              backgroundColor: 'white',
            height:height/2,
              width: card_Width,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 30,
              position: 'absolute',
              elevation: 2,
            },
            animatedStyle,
            
          ]}
          activeOpacity={1}
          onPressIn={() => updatingValue(1)}
          onPressOut={() => updatingValue(0)}
       
        >
          <Text>{item.id}</Text>
        </AnimatedTochableOpacity>
      </PanGestureHandler>
    );
  };

  const onSwipeUp = (val, item, index) => {
    var arry = [...state];
    const data = arry.filter(item => item.id != arry[index].id);

    if (val) {
      setState([...data]);
    } else {
      setState([...data]);
    }
  };
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {state
          .map((item, index) => (
            <SwipeGesture
              item={item}
              index={index}
              key={index.toString()}
              onSwipeUp={val => onSwipeUp(val, item, index)}
            />
          ))
          .reverse()}
      </View>
    </GestureHandlerRootView>
  );
};

export default LikeDislikeSwip;

const styles = StyleSheet.create({});

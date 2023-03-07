import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC} from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');

const SIZE = 90;
type propType = {
  index: number;
};
const RenderCircle: FC<propType> = ({index}) => {
  const customStyle = (index: number) => {
    switch (index) {
      case 0:
        return {
          top: height / 6.5,
        right:"32%",
          height: height / 9.5 + 20,
          width: height / 9.5 + 20,
        };
        break;
      case 1:
        return {
          top: 0,
          right:"32%",
          height: height / 9.5 + 20,
          width: height / 9.5 + 20,
        };
        break;
      case 2:
        return {
          top: '11%',
          right: '2%',
          height: height / 9.5,
          width: height / 9.5,
        };
        break;
      case 3:
        return {
          top: '39%',
          right: 0,
          height: height / 9.5,
          width: height / 9.5,
        };
        break;
      case 4:
        return {
          bottom: '9%',
          right: '2%',
          height: height / 9.5,
          width: height / 9.5,
        };
        break;
      case 5:
        return {
          bottom: 0,
          right:"32%",
          height: height / 9.5 + 20,
          width: height / 9.5 + 20,
        };
        break;
      case 6:
        return {
          bottom: '16%',
          left: 0,
          height: height / 9.5 + 20,
          width: height / 9.5 + 20,
        };
        break;
      case 7:
        return {
          top: '23%',
          left: '5%',
          height: height / 9.5,
          width: height / 9.5,
        };
        break;
    }
  };
  type ContextType = {
    translateX: number;
    translateY: number;
  };
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}, {translateY: translateY.value}],
  }));

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

    onEnd: event => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);

      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
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
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View
        style={[
          customStyle(index),
          {
            position: 'absolute',
          },
          reanimatedStyle,
        ]}>
        <TouchableOpacity
          style={{
            backgroundColor: 'red',
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: SIZE,
          }}>
          <Text>{index}</Text>
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

const RedialMenu = () => {
  const data = [{}, {}, {}, {}, {}, {}, {}, {}];

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View
        style={{
          height: height / 2.3,
          marginHorizontal: height / 32,
          marginTop: 50,
        }}>
        {data.map((item, index) => {
          return <RenderCircle index={index} key={index.toString()} />;
        })}
      </View>
    </GestureHandlerRootView>
  );
};

export default RedialMenu;

const styles = StyleSheet.create({});

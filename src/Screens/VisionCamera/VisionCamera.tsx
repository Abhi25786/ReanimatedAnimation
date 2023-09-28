import {
    ActivityIndicator,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {
    GestureHandlerRootView,
    PanGestureHandler,
    PanGestureHandlerGestureEvent,
    PinchGestureHandler,
    PinchGestureHandlerGestureEvent,
  } from 'react-native-gesture-handler';
  import {Camera, useCameraDevice} from 'react-native-vision-camera';
  import Animated, {
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
  } from 'react-native-reanimated';
  
  const {width, height} = Dimensions.get('window');
  
  type ContextType = {
    translateX: number;
    translateY: number;
  };
  
  const VisionCamera = () => {
    const device = useCameraDevice('back');
    const scale = useSharedValue(1); // Initialize scale to 1 (original zoom level)
    const focalX = useSharedValue(0);
    const focalY = useSharedValue(0);
  
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
  
    useEffect(() => {
      (async () => {
        const newCameraPermission = await Camera.requestCameraPermission();
  
        if (
          newCameraPermission == 'authorized' ||
          newCameraPermission == 'granted'
        ) {
          console.log(
            newCameraPermission,
            'newCameraPermissionnewCameraPermission',
          );
        }
      })();
    }, []);
  
    const pinchHandler =
      useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
        onStart(event, context) {},
        onActive: (event, context) => {
          scale.value = withSpring(event.scale);
        },
        onEnd: () => {
          // Add bounds for the scale to prevent over-zooming
          scale.value = withSpring(Math.max(1, Math.min(scale.value, 1.6)));
  
          // Check if the scale is less than 1, and if so, reset it to 1
          if (scale.value < 1) {
            scale.value = withSpring(1);
          }
        },
      });
  
    const panGestureEvent = useAnimatedGestureHandler<
      PanGestureHandlerGestureEvent,
      ContextType
    >({
      onStart: (event, context) => {
        context.translateX = translateX.value;
        context.translateY = translateY.value;
      },
      onActive: (event, context) => {
        translateX.value = event.translationX + context.translateX;
        translateY.value = event.translationY + context.translateY;
      },
    });
  
    const rStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {translateX: -focalX.value},
          {translateY: -focalY.value},
          {scale: scale.value},
          {translateX: focalX.value},
          {translateY: focalY.value},
        ],
      };
    });
  
    const gestureAnimation = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateX: translateX.value,
          },
          {
            translateY: translateY.value,
          },
        ],
      };
    });
  
    const LoadingView = () => {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={'red'} />
        </View>
      );
    };
  
    if (device == null) return <LoadingView />;
    return (
      <GestureHandlerRootView
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
        <PanGestureHandler onGestureEvent={panGestureEvent}>
          <Animated.View
            style={[
              {alignItems: 'center', justifyContent: 'center'},
              gestureAnimation,
            ]}>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.Image
                source={require('../../../offer.png')}
                style={[styles.image, rStyle]}
              />
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    );
  };
  
  export default VisionCamera;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: width / 1.6,
      height: height / 3,
      resizeMode: 'contain',
    },
  });
  
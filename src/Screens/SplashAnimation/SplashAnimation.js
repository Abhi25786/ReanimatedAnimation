import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { moderateScale, width } from '../styles/responsiveSize';
import colors from '../styles/colors';
const {height} = Dimensions.get('window');
const SplashAnimation = ({animationData=[],onVideoEnd=()=>{}}) => {
  const callbackdata = (index) => {
    setTimeout(() => {
      if (index == animationData?.slice(0,7).length - 1) {
        onVideoEnd(false)
      }
    },index*450 );false
}

  return (
    <View style={{flex: 1,
     alignItems: 'center' ,
     backgroundColor:colors.orangeooryks,
     width:width}}>
      <Animated.FlatList
        data={animationData?.slice(0,7)}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        bounces={false}
        horizontal
        
        contentContainerStyle={{alignItems: 'center'}}
        ItemSeparatorComponent={() => <View style={{paddingRight: moderateScale(10)}} />}
        renderItem={({item, index}) => (
          <AnimatedImage index={index} item={item} callbackdata={callbackdata} animationData={animationData} />
        )}
      />
    </View>
  );
};
export default SplashAnimation;

export const AnimatedImage = ({item, index,callbackdata ,animationData}) => {
  const translateY = useSharedValue(-height);
  useEffect(() => {
          translateY.value = withDelay((index + 1) * 200, withSpring(0,{},runOnJS(callbackdata)(index)))
  }, []);

  const animatedInageStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <Animated.Image
      source={item}
      style={[
        {  height: animationData.length > 6 ? height/19 :height/17, width: animationData.length > 6 ? width/9 :width/7.5, resizeMode: 'contain', tintColor: 'white' },
        index + (1 % 2) == 0 ? { marginRight: moderateScale(10) } : { marginLeft: moderateScale(10) },
        animatedInageStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({});

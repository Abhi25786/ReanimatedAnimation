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
const { height, width } = Dimensions.get('window');
const SplashAnimation = ({  onVideoEnd = () => { } }) => {
  
  const [animationData, setAnimationData] = useState([
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
  ]);
  const callbackdata = (index) => {
    setTimeout(() => {
      if (index == animationData?.slice(0, 7).length - 1) {
        alert('video end')
        onVideoEnd(false)
      }
    },index*450 );false
}

  return (
    <View style={{flex: 1,
     alignItems: 'center' ,
     backgroundColor:'green',
     width:width}}>
      <Animated.FlatList
        data={animationData?.slice(0,7)}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        bounces={false}
        horizontal
        
        contentContainerStyle={{alignItems: 'center'}}
        ItemSeparatorComponent={() => <View style={{paddingRight: 10}} />}
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
    source={item.image}
      style={[
        {  height: animationData.length > 6 ? height/19 :height/17, width: animationData.length > 6 ? width/9 :width/7.5, resizeMode: 'contain', tintColor: 'white' },
        index + (1 % 2) == 0 ? { marginRight: 10 } : { marginLeft: 10},
        animatedInageStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({});

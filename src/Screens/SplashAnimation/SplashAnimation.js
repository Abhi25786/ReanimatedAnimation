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
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
const {height} = Dimensions.get('window');
const SplashAnimation = () => {
  const [animationData, setAnimationData] = useState([
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
    {image: require('../../../offer.png')},
  ]);

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <Animated.FlatList
        data={animationData}
        scrollEnabled={false}
        keyExtractor={(item, index) => index.toString()}
        bounces={false}
        horizontal
        contentContainerStyle={{alignItems: 'center'}}
        ItemSeparatorComponent={() => <View style={{paddingRight: 10}} />}
        renderItem={({item, index}) => (
          <AnimatedImage index={index} item={item} />
        )}
      />
    </SafeAreaView>
  );
};
export default SplashAnimation;

export const AnimatedImage = ({item, index}) => {
  const translateY = useSharedValue(-height);
  useEffect(() => {
    //   translateY.value = index == 3 ? withSpring(0) :
    //       withDelay((index + 1) * 300, withTiming(0))
          translateY.value = withDelay((index + 1) * 200, withTiming(0))
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
        {height: 40, width: 40, backgroundColor: 'red'},
        index + (1 % 2) == 0 ? {marginRight: 10} : {marginLeft: 10},
        animatedInageStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({});

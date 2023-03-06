import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';
import {Page} from './Page';

const InterPolateScrolView = () => {
    const data = ['hi', '2', '3', '4'];
    const translateX=useSharedValue(0)
    const onScrolHandle = useAnimatedScrollHandler((event) => {
        translateX.value=event.contentOffset.x
        
    })
  return (
    <View style={{flex: 1}}>
      <Animated.ScrollView horizontal onScroll={onScrolHandle} scrollEventThrottle={16} pagingEnabled>
        {data.map((title, index) => (
          <Page title={title} index={index} key={index.toString()} translateX={translateX} />
        ))}
      </Animated.ScrollView>
    </View>
  );
};

export default InterPolateScrolView;

const styles = StyleSheet.create({});

import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useState } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedScrollHandler, useDerivedValue } from 'react-native-reanimated'
const ScrolViewIndicator = () => {
  
    const scrollElementHeightPercent = 20;
    const Size = 100; //<----------------- this is user for scroll width control 
    const [contentOffset, setContentOffset] = useState(0);
  
    const onScrolHandle = useAnimatedScrollHandler(event => {
    'worklet';
      const scrollView =
        (event.contentOffset.x /
          (event.contentSize.width - event.layoutMeasurement.width)) *
        (Size - scrollElementHeightPercent);
  
      // setContentOffset(scrollView);
    runOnJS(setContentOffset)(scrollView)
    });

  return (
    <View style={{alignItems: 'center'}}>
    <Animated.ScrollView
      horizontal
        onScroll={onScrolHandle}
        showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      contentContainerStyle={{paddingHorizontal: 5}}>
      {[...Array(10)].map((title, index) => (
        <Animated.View
          style={{
            height: 160,
            width: 290,
            backgroundColor: 'red',
            borderRadius:12,
            marginHorizontal: 5,
            marginTop:10,
          }}
          key={index.toString()}
        />
      ))}
    </Animated.ScrollView>
    <Animated.View
      style={{
        height: 5,
        backgroundColor: 'red',
        marginTop: 10,
        width: 100,
      }}>
      <Animated.View
        style={{
          height: 5,
          backgroundColor: 'green',
          transform: [{translateX: contentOffset}],
          width: `${scrollElementHeightPercent}%`,
        }}
      />
    </Animated.View>
  </View>
  )
}
export default memo(ScrolViewIndicator)
const styles = StyleSheet.create({})
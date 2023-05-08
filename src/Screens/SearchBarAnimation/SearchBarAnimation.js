import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
const { height, width } = Dimensions.get('window')


const SearchBarAnimation = () => {
    const translateY=useSharedValue(0)
    const onScrolHandle = useAnimatedScrollHandler((event) => {
      if (event.contentOffset.y > 170) {
        translateY.value=170
     
        return
      }
      translateY.value = event.contentOffset.y
    
  })
    const scrollw = useAnimatedStyle(() => {
      const widthv = interpolate(translateY.value,
        [0, 100, 0],
        [95, 46.5, 95])
      const borderRadius=interpolate(translateY.value,
        [0, 100, 0],
        [0, 100, 0])
        const translateX=interpolate(translateY.value,
          [0, 100, 0],
          [6, width /2, 6])
       
      return {
        width: `${widthv}%`,
        height: 50,
        bottom: 10,
        borderRadius,
        transform:[{translateX}],
  
        
  
      }
    })
    const headerMainView = useAnimatedStyle(() => {
      const headerHeight=interpolate(translateY.value,
        [0, 100, 0],
        [100, 80, 100])
      return {
        width: width,
        height:headerHeight,
        backgroundColor: 'pink',
        overflow: 'hidden',
       
     
        
    }
  })
  return (
    <View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center' }}>
    <Animated.View style={headerMainView}>
      <Text style={{marginTop:10,fontSize:16,fontWeight:'bold',paddingLeft:10}}>App Name</Text>
      <Animated.View style={[{position:'absolute',backgroundColor:'green',justifyContent:'center',alignItems:'center'},scrollw]}>
          <Text>sacd</Text>
      </Animated.View>
    </Animated.View>
    <Animated.ScrollView onScroll={onScrolHandle} scrollEventThrottle={16} >
      <Animated.View style={{ height: height * 2, backgroundColor: 'white', width: width - 20 }}>

      </Animated.View>
    </Animated.ScrollView>
  </View>
  )
}

export default SearchBarAnimation

const styles = StyleSheet.create({})
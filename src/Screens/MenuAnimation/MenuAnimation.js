import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CarView from './CarView';
const MenuAnimation = () => {
    const [state, setState] = useState([{ id: 1, animatedValue: 0 }, { id: 2, animatedValue: 0 }, { id: 3, animatedValue: 0 }]);
    const [curIndex, setIndex] = useState(0)
    const onPress = async (itm, ind) => {
      setIndex(ind)
    }
    const renderItem = ({ item, index }) => {
      return (
        <CarView
          index={index}
          item={item}
          curIndex={curIndex}
          onPress={() => onPress(item, index)}
        />
      )
    }
  return (
    <Animated.View style={{ flex: 1,backgroundColor:'white' }}>
    <FlatList
      data={state}
      style={{}}
      contentContainerStyle={{flex:1}}
      renderItem={renderItem} />
  </Animated.View>
  )
}

export default MenuAnimation

const styles = StyleSheet.create({})
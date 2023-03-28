import {View, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import Animated, {useSharedValue} from 'react-native-reanimated';

const OfficeTask = () => {

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={{}}>
        <Animated.View style={{height:100,backgroundColor:'red'}}></Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default OfficeTask;

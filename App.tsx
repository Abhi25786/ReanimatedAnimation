import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RedialMenu from './src/Screens/LikeDislikeSwip/LikeDislikeSwip';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <RedialMenu />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});



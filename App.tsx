import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SwipeMenuSheet from './src/Screens/SwipeMenuSheet/SwipeMenuSheet'

const App = () => {
const [selectedId,setSelectedId] = useState(false)
  return (
    <SafeAreaView style={{zIndex: 1, flex: 1}}>
      <Button title="category" onPress={() => setSelectedId(true)} />
   
        <SwipeMenuSheet
          selectedId={selectedId}
          setSelectedId={() => setSelectedId(false)}
        />
    </SafeAreaView>
  );
}

export default App

const styles = StyleSheet.create({})
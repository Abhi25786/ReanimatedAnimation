import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import IntoSliderCom from './src/Screens/IntroSlider/IntoSliderCom';
import Animated from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      uri: 'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'HI ',
    },
    {
      id: 2,
      uri: 'https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'hello ',
    },
    {
      id: 3,
      uri: 'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'bye ',
    },
    {
      id: 4,
      uri: 'https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text: 'good',
    },

  ]);
  return (
    <View style={{ flex: 1 }}>
      <IntoSliderCom
        data={data}
        rnederImage={item => {
          return (
            <Animated.Image
              source={{ uri: item?.uri }}
              style={[{ height: height / 1.7, width: width }]}
            />
          );
        }}
        pagination={true}
        activeDotWidth={30}
        inactiveDotWidth={10}
        inactiveDotColor={'gray'}
        activeDotColor={'black'}
        autoScroll={true}
        renderTextView={item => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',

              }}>
              <Text>{item?.text}</Text>
            </View>
          );
        }}
        mainContainerStyle={{}}
        imageIntrpolateScale={[0.5, 1, 0.5]}
        onPressStart={() => alert('dwaesd')}
        scrollIndecatorHeight={6}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});


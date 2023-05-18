import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import IntoSliderCom from './src/Screens/IntroSlider/IntoSliderCom';

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      uri: 'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text:'HI '
    },
    {
      id: 2,
      uri: 'https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text:'hello '
    },
    {
      id: 3,
      uri: 'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text:'bye '
    },
    {
      id: 4,
      uri: 'https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      text:'good'
    },
  ]);
  return (
    <View style={{flex: 1}}>
      <IntoSliderCom data={data} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});

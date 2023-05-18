import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { FC, memo, useEffect, useRef, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import CradView from './CradView';
import Pagination from './Pagination';
import AnimtedText from './AnimtedText';
const { height, width } = Dimensions.get('window');
type IntoSliderProps = {
  data: Array<object>
  onPressStart: void
}
const IntoSliderCom : FC<IntoSliderProps> =({ data ,onPressStart=()=>{}}) => {
  const [sliderState, setSliderState] = useState(1);
  const translateX = useSharedValue(0);
  const scrollViewRef = useRef();
  console.log(sliderState,'sliderStatesliderState');

useEffect(() => {
  const interval = setInterval(() => {
    if (sliderState!=data.length) {
    onPressNext()
    }
  }, 5000);
  return () => clearInterval(interval);
}, [sliderState]);
  
  const setSliderPage = (event:any) => {
    const { x } = event.contentOffset;
    const indexOfNextScreen = Math.fround((x + width) / width)?.toFixed(0);
    if (indexOfNextScreen !== sliderState) {
      setSliderState(indexOfNextScreen);
    }
  };
  const onScrolHandle = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
    runOnJS(setSliderPage)(event);
  });
  const onPressNext = async () => {
  await   setSliderState(sliderState + 1);
    scrollViewRef.current.scrollTo({ x: width * sliderState });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: height / 1.7 }}>
        <Animated.ScrollView
          horizontal
          ref={scrollViewRef}
          onScroll={onScrolHandle}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {data.map((item, index) => (
            <CradView
              item={item}
              index={index}
              key={index.toString()}
              translateX={translateX}
            />
          ))}
        </Animated.ScrollView>
      </View>
      <View
        style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
        {data.map((item, index) => (
          <Pagination
            item={item}
            index={index}
            key={index.toString()}
            translateX={translateX}
            cruntIndex={sliderState}
          />
        ))}
      </View>
      <View style={{ alignItems: 'center', justifyContent: 'center', height: height / 5 }}>
        {data.map((item, index) => {
          return (
            <AnimtedText
              item={item}
              index={index}
              key={index.toString()}
              translateX={translateX}
            />
          )
        })}
      </View>

      <TouchableOpacity
        style={{
          height: 50,
          width: width - 30,
          alignSelf: 'center',
          backgroundColor: 'gray',
          position: 'absolute',
          bottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => sliderState == data.length ? onPressStart() : onPressNext()}>
        <Text>{sliderState == data.length ? 'Start' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(IntoSliderCom);

const styles = StyleSheet.create({});

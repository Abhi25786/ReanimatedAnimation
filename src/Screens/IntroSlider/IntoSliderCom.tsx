import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, memo, useEffect, useRef, useState} from 'react';
import Animated, {
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import CradView from './CradView';
import Pagination from './Pagination';
import AnimtedText from './AnimtedText';
import {scaleAnimation, translateRightToLeft} from './AnimatedFunctions';
const {height, width} = Dimensions.get('window');
type IntoSliderProps = {
  data: Array<object>;
  onPressStart: any;
  rnederImage: any;
  pagination: boolean;
  inactiveDotWidth: number;
  activeDotWidth: number;
  inactiveDotColor: string;
  activeDotColor: string;
  renderTextView: any;
  renderTextViewStyle: any;
  mainContainerStyle: any;
  autoScroll: boolean;
  imageIntrpolateScale: Array<number>;
};
const IntoSliderCom: FC<IntoSliderProps> = ({
  data,
  onPressStart = () => {},
  rnederImage = () => {},
  pagination = false,
  inactiveDotWidth,
  activeDotWidth,
  activeDotColor,
  inactiveDotColor,
  renderTextView = () => {},
  renderTextViewStyle,
  mainContainerStyle,
  autoScroll = false,
  imageIntrpolateScale = [0.9, 1, 0.9],
}) => {
  const [sliderState, setSliderState] = useState(1);
  const translateX = useSharedValue(0);
  const scrollViewRef = useRef();
  console.log(sliderState, 'sliderStatesliderState');

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScroll && sliderState != data.length) {
        onPressNext();
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderState]);

  const setSliderPage = (event: any) => {
    const {x} = event.contentOffset;
    const indexOfNextScreen = Math.fround((x + width) / width)?.toFixed(0);
    if (indexOfNextScreen !== sliderState) {
      setSliderState(indexOfNextScreen);
    }
  };
  const onScrolHandle = useAnimatedScrollHandler(event => {
    'worklet';
    translateX.value = event.contentOffset.x;
    runOnJS(setSliderPage)(event);
  });
  const onPressNext = async () => {
    await setSliderState(sliderState + 1);
    scrollViewRef.current.scrollTo({x: width * sliderState});
  };

  return (
    <View style={{...mainContainerStyle, flex: 1}}>
      <View style={{height: height / 1.7}}>
        <Animated.ScrollView
          horizontal
          ref={scrollViewRef}
          onScroll={onScrolHandle}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {data.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const outputRange = imageIntrpolateScale;
            return (
              <Animated.View
                style={scaleAnimation(translateX, inputRange, outputRange)}>
                {rnederImage(item, index)}
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </View>
      {!!pagination ? (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'center',
          }}>
          {data.map((item, index) => (
            <Pagination
              index={index}
              key={index.toString()}
              translateX={translateX}
              cruntIndex={sliderState}
              inactiveDotWidth={inactiveDotWidth}
              activeDotWidth={activeDotWidth}
              activeDotColor={activeDotColor}
              inactiveDotColor={inactiveDotColor}
            />
          ))}
        </View>
      ) : null}

      <View
        style={{
          ...renderTextViewStyle,
          alignItems: 'center',
          justifyContent: 'center',
          height: height / 4.5,
          marginTop: 20,
          overflow: 'hidden',
        }}>
        {data.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = [width, 0, -width];
          return (
            <Animated.View
              style={[
                {position: 'absolute'},
                translateRightToLeft(translateX, inputRange, outputRange),
              ]}>
              {renderTextView(item, index)}
            </Animated.View>
          );
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
        onPress={() =>
          sliderState == data.length ? onPressStart() : onPressNext()
        }>
        <Text>{sliderState == data.length ? 'Start' : 'Next'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default memo(IntoSliderCom);

const styles = StyleSheet.create({});

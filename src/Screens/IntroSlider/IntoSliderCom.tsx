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
import {
  scaleAnimation,
  translateRightToLeft,
  widthAnimation,
} from './AnimatedFunctions';
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
  scrollIndecatorHeight:number
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
  scrollIndecatorHeight
}) => {
  const [sliderState, setSliderState] = useState(1);
  const scrollElementHeightPercent = 10;
  const Size = 100;
  const [contentOffset, setContentOffset] = useState(0);
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
  }, [sliderState, autoScroll]);

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
    const scrollView =
      (event.contentOffset.x /
        (event.contentSize.width - event.layoutMeasurement.width)) *
      (100 - scrollElementHeightPercent);
    runOnJS(setContentOffset)(scrollView);
    runOnJS(setSliderPage)(event);
  });
  const onPressNext = async () => {
    await setSliderState(sliderState + 1);
    scrollViewRef.current.scrollTo({x: width * sliderState});
  };

  return (
    <View style={{...mainContainerStyle, flex: 1}}>
      <Animated.ScrollView
        horizontal
        ref={scrollViewRef}
        onScroll={onScrolHandle}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {data?.map((item, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = imageIntrpolateScale;
          const textOutputRange = [width, 0, -width];

          return (
            <View style={{flex: 1}} key={index.toString()}>
              <Animated.View
                style={[
                  scaleAnimation(translateX, inputRange, outputRange),
                  {flex: 0.65},
                ]}>
                {rnederImage(item, index)}
              </Animated.View>

              <Animated.View
                style={[
                  renderTextViewStyle,
                  {
                    flex: 0.25,
                  },
                  translateRightToLeft(translateX, inputRange, textOutputRange),
                ]}>
                {renderTextView(item, index)}
              </Animated.View>
            </View>
          );
        })}
      </Animated.ScrollView>
      {!!pagination ? (
          <Pagination
            data={data}
            translateX={translateX}
            cruntIndex={sliderState}
            inactiveDotWidth={inactiveDotWidth}
            activeDotWidth={activeDotWidth}
            activeDotColor={activeDotColor}
            inactiveDotColor={inactiveDotColor}
            contentOffset={contentOffset}
          scrollElementHeightPercent={scrollElementHeightPercent}
          scrollIndecatorHeight={scrollIndecatorHeight}
          />
      ) : null}

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

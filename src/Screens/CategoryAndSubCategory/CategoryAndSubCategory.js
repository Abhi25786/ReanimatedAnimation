import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import CategoryComponents from './CategoryComponents';
import SubCategoryComponent from './SubCategoryComponent';
const {width, height} = Dimensions.get('window');

const CategoryAndSubCategory = () => {
  const flatListRef = useRef();
  const [data, setData] = useState([
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
    {id: 11},
    {id: 12},
  ]);

  const [curIndex, setCurIndex] = useState(null);
  const animatedValues = useSharedValue(0);

  const scale = data.map(() => useSharedValue(0));
  const bubbleAnimation = data.map(() => useSharedValue(0));
  useEffect(() => {
    bubbleAnimation.forEach((value, index) => {
      value.value = withDelay(index * 200, withTiming(1, {duration: 1000}));
    });
  }, []);

  // ---------------OnPress----------------
  const onPress = id => {
    setCurIndex(id);
    bubbleAnimation.forEach((value, index) => {
      value.value = withDelay(index * 200, withTiming(0, {duration: 1000}));
    });
    animatedValues.value = withTiming(1, {duration: 400});
    scale.forEach((value, index) => {
      value.value = withDelay(index * 200, withTiming(1));
    });
  };

  const viewStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValues.value,
      [0, 1, 0],
      [0, -width, 0],
      Extrapolate.CLAMP,
    );

    return {
      width: width,
      position: 'absolute',
      height: height,
      top: 10,
      transform: [{translateX}],
    };
  });

  const secondView = useAnimatedStyle(() => {
    const translateX = interpolate(
      animatedValues.value,
      [0, 1, 0],
      [width * 1.2, 0, width * 1.2],
      Extrapolate.CLAMP,
    );

    return {
      width: width,
      position: 'absolute',
      height: height,
      top: 10,
      transform: [{translateX}],
    };
  });
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Animated.View style={viewStyle}>
        <FlatList
          data={data}
          ref={flatListRef}
          numColumns={2}
          columnWrapperStyle={{
            // justifyContent: 'center',
            flexWrap: 'wrap',
            //   paddingHorizontal: 40,
          }}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <CategoryComponents
              item={item}
              index={index}
              key={index.toString()}
              animatedValue={bubbleAnimation[index]}
              onPress={() => onPress(item.id)}
            />
          )}
        />
      </Animated.View>

      {/* -------secondView--------- */}
      <Animated.View style={secondView}>
        <FlatList
          data={data}
          ref={flatListRef}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            //   paddingHorizontal: 40,
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={
                  {
                    //   paddingHorizontal: 16,
                  }
                }>
                <TouchableOpacity
                  onPress={() => {
                    setCurIndex(null);
                    flatListRef.current.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                    animatedValues.value = withTiming(0, {duration: 400});
                    scale.forEach((value, index) => {
                      value.value = withTiming(0);
                    });
                    bubbleAnimation.forEach((value, index) => {
                      value.value = withDelay(
                        index * 200,
                        withTiming(1, {duration: 1000}),
                      );
                    });
                  }}>
                  <Image
                    source={{
                      uri: 'https://cdn1.iconfinder.com/data/icons/duotone-essentials/24/chevron_backward-512.png',
                    }}
                    style={{
                      height: height / 20,
                      width: width / 20,
                      tintColor: 'black',
                      resizeMode: 'contain',
                    }}
                  />
                </TouchableOpacity>
                <Image
                  source={{
                    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxhtmBqlJilp6X2q2XsYxJ9DVYb_F8x17DjIOJcHtT&s',
                  }}
                  style={{
                    height: height / 6,
                    width: width - 40,
                    resizeMode: 'stretch',
                    marginBottom: 20,
                    borderRadius: 16,
                    alignSelf: 'center',
                  }}
                />
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{height: 10}} />}
          renderItem={({item, index}) => (
            <SubCategoryComponent
              index={index}
              customStyle={() => {
                return {
                  height: width / 2.4,
                  backgroundColor: 'red',
                  width: width / 2.4,
                  borderRadius: width / 3,
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                };
              }}
              key={index.toString()}
              item={item}
              onPressCategory={() => null}
              scaleAnimation={scale[index]}
              animationSpeed={150}
            />
          )}
        />
      </Animated.View>
    </View>
  );
};

export default CategoryAndSubCategory;

const styles = StyleSheet.create({});

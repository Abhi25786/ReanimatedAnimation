import {
    Alert,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');
const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const RenderView = ({
    item,
    index,
    onPress = () => { },
    style,
    selectedIndex,
}) => {
    console.log(selectedIndex);
    
    const InputRange = [0, 1, 0];
    const viewStyle = useAnimatedStyle(() => {
        const hight = interpolate(
            style?.value,
            InputRange,
            [height / 10, height / 4, height / 10],
            Extrapolate.CLAMP,
        );
        const borderBottomWidth = interpolate(
            style?.value,
            InputRange,
            [1, 0, 1],
            Extrapolate.CLAMP,
        );
        return {
            height: hight,
            borderBottomWidth,
        };
    });
    const animatedImageStyle = useAnimatedStyle(() => {
        const ImageX = interpolate(
            style?.value,
            InputRange,
            [width / 25, width / 3.4, width / 25],
            Extrapolate.CLAMP,
        );
        const Size = interpolate(
            style?.value,
            InputRange,
            [50, 80, 50],
            Extrapolate.CLAMP,
        );

        return {
            height: Size,
            width: Size,
            transform: [{ translateX: ImageX }],
        };
    });
    const viewText = useAnimatedStyle(() => {
        const animatedwidth = interpolate(
            style?.value,
            InputRange,
            [width / 4, width / 1.09, width / 4],
            Extrapolate.CLAMP,
        );
        const hight = interpolate(
            style?.value,
            InputRange,
            [height / 10.1, height / 9.9, height / 10.1],
            Extrapolate.CLAMP,
        );
        const translateX = interpolate(
            style?.value,
            InputRange,
            [width / 4, 0, width / 4],
            Extrapolate.CLAMP,
        );
        const translateY = interpolate(
            style?.value,
            InputRange,
            [0, 120, 0],
            Extrapolate.CLAMP,
        );
        return {
            width: animatedwidth,
            height: hight,
            transform: [{ translateX: translateX }, { translateY: translateY }],
        };
    });

    const carNameText = useAnimatedStyle(() => {
        const fontSize = interpolate(
            style?.value,
            InputRange,
            [16, 22, 16],
            Extrapolate.CLAMP,
        );
        const translateX = interpolate(
            style?.value,
            InputRange,
            [0, 20, 0],
            Extrapolate.CLAMP,
        );
        return {
            fontSize,
            transform: [{ translateX }],
        };
    });
    const carPriceText = useAnimatedStyle(() => {
        const fontSize = interpolate(
            style?.value,
            InputRange,
            [14, 22, 14],
            Extrapolate.CLAMP,
        );
        const translateX = interpolate(
            style?.value,
            InputRange,
            [0, width / 1.5, 0],
            Extrapolate.CLAMP,
        );
        const translateY = interpolate(
            style?.value,
            InputRange,
            [height / 19, 5, height / 19],
            Extrapolate.CLAMP,
        );
        return {
            fontSize,
            transform: [{ translateX }, { translateY }],
        };
    });

    const timeText = useAnimatedStyle(() => {
        const translateX = interpolate(
            style?.value,
            InputRange,
            [0, 22, 0],
            Extrapolate.CLAMP,
        );
        const translateY = interpolate(
            style?.value,
            InputRange,

            [height / 40, 30, height / 40],
            Extrapolate.CLAMP,
        );
        return {
            transform: [{ translateX }, { translateY }],
        };
    });

    const buttonStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            style?.value,
            InputRange,
            [-2, 1, -2],
            Extrapolate.CLAMP,
        );
        const translateY = interpolate(
            style?.value,
            InputRange,
            [height / 2, 0, -height / 2],
            Extrapolate.CLAMP,
        );

        return {
            opacity,
            transform: [{ translateY }],
        };
    });


    return (
        <View style={{ overflow: 'hidden' }}>
            <Text>{item.id}</Text>

            <TouchableOpacity
                style={{ overflow: 'hidden', marginHorizontal: 20 }}
                onPress={onPress}
                activeOpacity={1}>
                <Animated.View
                    style={[
                        {
                            width: width,
                            overflow: 'hidden',
                        },
                        viewStyle,
                    ]}>
                    <AnimatedImage
                        source={{
                            uri: 'https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
                        }}
                        style={[{ height: 50, width: 50, marginTop: 10 }, animatedImageStyle]}
                    />
                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                            },
                            viewText,
                        ]}>
                        <AnimatedText style={[{ fontSize: 20, marginTop: 4 }, carNameText]}>
                            Car Go
                        </AnimatedText>
                        <AnimatedText
                            style={[
                                { fontSize: 14, position: 'absolute', marginTop: 4 },
                                timeText,
                            ]}>{`6.02 pm `}</AnimatedText>
                        <AnimatedText
                            style={[{ fontSize: 20, position: 'absolute' }, carPriceText]}>
                            ₹ 30,59
                        </AnimatedText>
                    </Animated.View>
                </Animated.View>
            </TouchableOpacity>
        </View>
    );
};
const App3 = () => {
    const [state, setState] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);
    const [state1, setState1] = useState([]);
    const [isOpen, setisOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState();
    const style = useSharedValue(0);
    const updateValue = (item, value, isOpenval, index) => {
        setState1(item);
        setSelectedIndex(index);
        setisOpen(isOpenval);
        style.value = withTiming(value, {
            duration: 450,
            easing: Easing.linear,
        });
    };
    const carTypeView = useAnimatedStyle(() => {
        const height = interpolate(
            style?.value,
            [1, 0, 1],
            [40, 0, 40],
            Extrapolate.CLAMP,
        );
        const opacity = interpolate(
            style?.value,
            [1, 0, 1],
            [1, -2, 1],
            Extrapolate.CLAMP,
        );
        return {
            opacity,
            height
        };
    });
    return (
        <View style={[{}]}>

            <AnimatedTouchableOpacity
                style={[{
                    backgroundColor: 'red',
                    width: 40,
                    marginLeft: 16,
                    borderRadius:10,
                    marginVertical: 10,

                }, carTypeView]}
                onPress={() => updateValue({}, 0, false)}
            />

            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 12,
                    alignSelf: 'center',
                    width: width - 30,
                    overflow: 'hidden',
                }}>
                {(!!isOpen ? [state1] : state).map((item, index) => {
                    return (
                        <RenderView
                            item={item}
                            index={index}
                            style={style}
                            selectedIndex={selectedIndex}
                            onPress={() => updateValue(item, 1, true, index)}
                        />
                    );
                })}
            </View>
            <AnimatedTouchableOpacity
                style={[{
                    backgroundColor: 'red',
                    marginHorizontal: 16,
                    marginVertical: 10,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent:'center'
                }, carTypeView]}
                onPress={() => alert('sadfd')}
            >
                <Text>Confirm</Text>
            </AnimatedTouchableOpacity>

        </View>
    );
};

export default App3;

const styles = StyleSheet.create({});

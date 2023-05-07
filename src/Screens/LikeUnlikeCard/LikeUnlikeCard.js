import { Animated, Dimensions, PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useRef, useState } from 'react'
import CardCom from './CardCom';
import stylesFun from './styles';
const { height, width } = Dimensions.get('window')


const LikeUnlikeCard = () => {
    // ----------------card array---------------------

    const [state, setState] = useState([{ id: 1, }, { id: 2 }, { id: 3 }, { id: 4 }]);
    const [heightIn, setHeightIn] = useState(false);
    const cardHeight = height * 1.01;//<---------card height
    const heightV = useRef(new Animated.Value(0)).current//<----------use for holding a scroll animation value 

    //  <-- this  card height animation 
    const maxHeight = heightV.interpolate({
        inputRange: [0, 1],
        outputRange: [cardHeight, cardHeight * 2],
        extrapolate: 'clamp'
    });
    const styles=stylesFun(maxHeight)


    // ------------------- this is use for scrollheight animation
    const onScroll = (event) => {
        const scrolling = event.nativeEvent?.contentOffset?.y;
        if (scrolling > 2) {
            heightV.setValue(1);
            setHeightIn(true);
            return;
        }
        heightV.setValue(0);
        setHeightIn(false);
    };


    const onSwipeUp = (val, item, index) => {
        var arry = [...state];

        const data = arry.filter(ite => ite.id != item.id);
        if (val) {
            setState([...data]);
            alert('like')
        } else {
            setState([...data]);
            alert('unlike')
        }
    };


 



    // --------------renderCard---------------
    const renderCard = useCallback(
        (item, index) => {
            console.log(heightIn, 'item,index');
            return (
                <CardCom
                    item={item}
                    index={index}
                    key={index}
                    heightIn={heightIn}
                    onSwipeUp={(val, ite, ind) => onSwipeUp(val, ite, ind)}
                />
            )
        },
        [state, heightIn],
    )




    return (
        <Animated.View style={styles.mainContainer}>
            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={onScroll}
            >
                <Animated.View
                    style={styles.cardHeight}
                >
                    {state.map(renderCard).reverse()}
                </Animated.View>
            </Animated.ScrollView>
        </Animated.View>
    )
}

export default memo(LikeUnlikeCard)


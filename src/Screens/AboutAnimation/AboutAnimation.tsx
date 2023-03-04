import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
import styles from './styles';
const AboutAnimation = () => {
  // --------------useSharedValue is inital value  of you animation action style-------------//

  const progress = useSharedValue(1);
  const scale = useSharedValue(2);

    // --------------useAnimatedStyle is use for animation  style-------------//
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: `${progress.value * 2 * Math.PI}rad` }],
      borderRadius: (progress.value * 50) / 2
    };
  }, []);
//   withRepeat:- The animation that will be repeated. --------
//   withSpring:- The target value at which the spring should settle.  --------
//   withTiming:- The target value at which the spring conclude .  --------

  useEffect(() => {
    progress.value = withRepeat(withSpring(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true)
  }, []);

  return (
    <View style={styles.mainContainer}>
      <Animated.View
        style={[
          styles.imageStyle,
          reanimatedStyle,
        ]}
      />
    </View>
  );
};

export default React.memo(AboutAnimation);


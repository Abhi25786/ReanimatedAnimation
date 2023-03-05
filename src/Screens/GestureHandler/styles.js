import {StyleSheet} from 'react-native';

export default ({SIZE, CIRCLE_RADIOUS}) => {
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    square: {
      height: SIZE,
      width: SIZE,
      backgroundColor: 'red',
      borderRadius: 20,
    },
    circleView: {
      height: CIRCLE_RADIOUS * 2,
      width: CIRCLE_RADIOUS * 2,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: CIRCLE_RADIOUS,
      borderWidth: 3,
      borderColor: 'red',
    },
  });
  return styles;
};

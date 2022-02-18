import { Dimensions, StyleSheet } from 'react-native';
import { COLORS } from '../../utils/Colors';

const {width,height} = Dimensions.get('window');
const TAB_WIDTH = '100%',
  TAB_HEIGHT = '60%';
export default StyleSheet.create({
    tabBarStyle: {
      height: height * 0.09,
      backgroundColor: COLORS.BAR_COLOR,
      flexDirection: 'row',
      width: '95%',
      justifyContent: 'space-evenly',
      alignSelf : 'center',
      alignItems: 'center',
      borderRadius : 50,
      marginBottom : 20,
      position : 'absolute',
      bottom : 0,
     
    },
    tabStyle: {
      width: '20%',
      height: height * 0.06,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tabStyleFocused: {
      width: width * 0.25,
      height: height * 0.9,
      justifyContent: 'center',
      alignItems: 'center',
    },
    tab: {
      height: TAB_HEIGHT,
      width: TAB_WIDTH,
      justifyContent: 'center',
      alignItems: 'center',
      tintColor : '#000',
    },
    focusTab: {
      height: height*0.03,
      width: width*0.06,
      justifyContent: 'center',
      alignItems: 'center',
      tintColor : '#fff'
    },
    imgCont: {
      height: '100%',
      width: width * 0.25,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
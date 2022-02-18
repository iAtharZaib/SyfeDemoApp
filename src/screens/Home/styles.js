import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../utils/Colors';

const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  sectionContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    
  },
  titleText: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: width * 0.05,
    paddingVertical: height * 0.003,
    textDecorationLine: 'underline',
    
  },
  itemStyling: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: width * 0.9,
    paddingVertical: height * 0.01,
    marginVertical: height * 0.005,
    backgroundColor: COLORS.SNACKBAR_GREEN,
    borderRadius: 20,
  },
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerView: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
  },
  innerTitle: {
    fontWeight: 'bold',
    textAlign: 'left',
    fontSize: width * 0.035,
    paddingVertical: height * 0.003,
  },
  innerDescription: {
    textAlign: 'left',
    width: width * 0.65,
    fontSize: width * 0.035,
    paddingVertical: height * 0.003,
  },
  innerText: {
    paddingVertical: height * 0.003,
    textAlign: 'left',
    fontSize: width * 0.035,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 10,
  },
  ButtonView: {
    marginVertical: height * 0.02,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    borderRadius: 20,
    width: width * 0.9,
    height: height * 0.13,
    backgroundColor: COLORS.BUTTON_COLOR,
  },
  textView: {
    fontSize: width * 0.07,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
});

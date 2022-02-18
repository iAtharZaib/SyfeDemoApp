import {StyleSheet,Dimensions} from 'react-native';
import {COLORS} from '../../utils/Colors';

const {width,height} = Dimensions.get('window');

export default StyleSheet.create({

    mainContainer: {
        backgroundColor: COLORS.SNACKBAR_GREEN,
        flex: 1,
        marginHorizontal:10
    },
    sectionContainer: {
        backgroundColor: COLORS.SNACKBAR_GREEN,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row'
    },
    titleText: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: width * 0.05,
        paddingVertical: height * 0.003,
        textDecorationLine: 'underline',
    },
    mainView:{
        alignItems: 'center',
        marginTop: height * 0.05,
      },
    innerView: {
        alignItems: 'flex-start',
        justifyContent: 'space-around'
    },
    innerTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: width * 0.07,
        paddingVertical: height * 0.003,
    },
    innerDescription: {
        textAlign: 'center',
        width: width * 0.65,
        fontSize: width * 0.035,
    },
    innerText: {
        textAlign: 'center',
        fontSize: width * 0.035,
        fontWeight:'bold',
        paddingVertical:height*0.005
    },
    img: {
        width: height*0.3,
        height: height*0.3,
        borderRadius:(height*0.3)/2
     
    },
    productionView:{flexDirection: 'row', marginHorizontal:10},
    genresView:{flexDirection: 'row', paddingVertical: height * 0.005},
});

import { StyleSheet ,Dimensions} from "react-native";
const {width,height} = Dimensions.get('window')
export default StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    img: {
        width:70 ,
        height: 70,
        borderRadius:35, 
        marginHorizontal:10

      },
  });
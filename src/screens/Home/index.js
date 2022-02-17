import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {APIKEY, BASEURL, IMAGEPATH} from '../../const/config';
import {COLORS} from '../../utils/Colors';
import styles from './styles';
const {width, height} = Dimensions.get('window');
const App = () => {
  const [moviesList, setmoviesList] = useState([]);

  useEffect(() => {
    getMoviesList();
  }, []);

  getMoviesList = () => {
    console.log(`${BASEURL}movie/upcoming?api_key=${APIKEY}`);
    axios
      .get(`${BASEURL}movie/upcoming?api_key=${APIKEY}`)
      .then(response => {
        setmoviesList(response.data.results);
        console.log(response, 'if chla');
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{backgroundColor: 'white'}}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Movies List</Text>
        </View>

        <FlatList
          keyExtractor={item => item.id}
          data={moviesList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index, separators}) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: width * 0.9,
                paddingVertical: height * 0.01,
                marginVertical: height * 0.005,
                backgroundColor: COLORS.SNACKBAR_GREEN,
                borderRadius: 20,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={{uri: IMAGEPATH + item.poster_path}}
                  resizeMode={'contain'}
                  style={styles.img}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'left',
                      fontSize: width * 0.03,
                    }}>
                    {item.original_title}
                  </Text>
                  <Text
                    style={{
                      paddingVertical: 5,
                      textAlign: 'left',
                      width: width * 0.65,
                      fontSize: width * 0.03,
                    }}
                    numberOfLines={5}
                    ellipsizeMode={'tail'}>
                    {item.overview}
                  </Text>
                  <Text
                    style={{
                      paddingVertical: 5,
                      textAlign: 'left',
                      fontSize: width * 0.03,
                    }}>
                    {item.release_date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;

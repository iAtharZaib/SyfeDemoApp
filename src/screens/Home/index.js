import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView, StatusBar,
  Text, TouchableOpacity, View
} from 'react-native';
import { APIKEY, BASEURL } from '../../const/config';
import styles from './styles';
const Home = props => {
  const [moviesList, setmoviesList] = useState([]);

  useEffect(() => {
    getMoviesList();
  }, []);

  getMoviesList = () => {
    if (moviesList && moviesList?.length <= 0) {
      axios
        .get(`${BASEURL}upcoming?api_key=${APIKEY}`)
        .then(response => {
          setmoviesList(response.data.results);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log('Already Exists');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.sectionContainer}>
        <Text style={styles.titleText}>Home</Text>
      </View>
      <TouchableOpacity
        style={styles.ButtonView}
        onPress={() => props.navigation.navigate('Movies List')}>
        <Text style={styles.textView}>Movies List</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.ButtonView}
        onPress={() => props.navigation.navigate('Popular Movies')}>
        <Text style={styles.textView}>Popular Movies</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.ButtonView}
        onPress={() => props.navigation.navigate('Latest Movies')}>
        <Text style={styles.textView}>Latest Movies</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

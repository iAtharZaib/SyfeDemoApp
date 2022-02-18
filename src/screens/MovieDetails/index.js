import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import  Icon from 'react-native-vector-icons/dist/Ionicons';
import {APIKEY, BASEURL, IMAGEPATH} from '../../const/config';
import { COLORS } from '../../utils/Colors';
import styles from './styles';

const MovieDetails = props => {
  const [movieDetails, setmovieDetails] = useState();
  const {id} = props.route.params;

  useEffect(() => {
    getMovieDetails();
  }, [props.route.params]);

  const getMovieDetails = () => {
    axios
      .get(`${BASEURL}${id}?api_key=${APIKEY}`)
      .then(response => {
        console.log(response);
        setmovieDetails(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.sectionContainer}>
        <TouchableOpacity style={{ flex:1, justifyContent:'flex-start', marginLeft:20}} onPress={() => props.navigation.goBack()}>
      <Icon color={COLORS.BAR_COLOR} size={25} name={'arrow-back'} />
      </TouchableOpacity>
      <View style={{ flex:2, justifyContent:'flex-start'}}>
        <Text style={styles.titleText}>Movies Details</Text>
        </View>
      </View>
      <View
        style={styles.mainView}>
          <Image
            source={{uri: IMAGEPATH + movieDetails?.poster_path}}
            resizeMode={'contain'}
            style={styles.img}
          />

          <Text style={styles.innerText}>ID# {movieDetails?.id}</Text>
          <Text style={styles.innerTitle}>{movieDetails?.title}</Text>
          <Text style={styles.innerText}>
            Release Date: {movieDetails?.release_date}
          </Text>
          <Text style={styles.innerText}>
            Movie Status: {movieDetails?.status}
          </Text>
          <Text
            style={styles.innerText}
            numberOfLines={5}
            ellipsizeMode={'tail'}>
            Original Title {movieDetails?.original_title}
          </Text>
          <View style={styles.genresView}>
            <Text style={styles.innerText}>Genres:</Text>
            {movieDetails?.genres.map(item => (
              <Text style={styles.innerText}>
                {item?.name} {'\n'}
              </Text>
            ))}
          </View>

          <View style={styles.productionView}>
            <Text style={styles.innerText}>Production Companies:</Text>
            {movieDetails?.production_companies.map(item => (
              <>
                <Text style={[styles.innerText, {textAlign: 'left'}]}>
                  {item?.name} {'\n'}
                </Text>
              </>
            ))}
          </View>
        </View>
    </SafeAreaView>
  );
};

export default MovieDetails;

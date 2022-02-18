import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList, Image, SafeAreaView, StatusBar,
  Text, TouchableOpacity, View
} from 'react-native';
import  Icon  from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { APIKEY, BASEURL, IMAGEPATH } from '../../const/config';
import { set_popularMoviesList } from '../../store/actions/mainActionCreator';
import { COLORS } from '../../utils/Colors';
import styles from './styles';

const {width, height} = Dimensions.get('window');
const PopularMovies = (props) => {

  const popularMoviesListRedux = useSelector(
    (state) => state.mainReducer.popularMoviesList,
  );

  const [popularMovies, setpopularMovies] = useState(popularMoviesListRedux)
  const dispatch = useDispatch();


  useEffect(() => {
    getPopularMoviesList();
  }, []);



  function getPopularMoviesList () {
    if(popularMoviesListRedux && popularMoviesListRedux?.length <= 0 ) {
    axios
      .get(`${BASEURL}popular?api_key=${APIKEY}`)
      .then(response => {
        setpopularMovies(response.data.results);
        dispatch(set_popularMoviesList(response.data.results))
      })
      .catch(error => {
        console.log(error);
      });
    }
      else 
      {
        console.log("Already Exists")
      }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.sectionContainer}>
        <TouchableOpacity style={{ flex:1, justifyContent:'flex-start', marginLeft:20}} onPress={() => props.navigation.goBack()}>
      <Icon color={COLORS.BAR_COLOR} size={25} name={'arrow-back'} />
      </TouchableOpacity>
      <View style={{ flex:2, justifyContent:'flex-start'}}>
        <Text style={styles.titleText}>Popular Movies</Text>
        </View>
      </View>

        <FlatList
          keyExtractor={item => item.id}
          data={popularMovies}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.itemStyling}
              onPress={() => props.navigation.navigate('Movie Details',{id:item?.id})}>
              <View style={styles.mainView}>
                <Image
                  source={{uri: IMAGEPATH + item.poster_path}}
                  resizeMode={'contain'}
                  style={styles.img}
                />
                <View style={styles.innerView}>
                <Text
                    style={styles.innerText}>
                    #{item.id}
                  </Text>
                  <Text
                    style={styles.innerTitle}>
                    {item.title}
                  </Text>
                  <Text
                    style={styles.innerDescription}
                    numberOfLines={5}
                    ellipsizeMode={'tail'}>
                    {item.original_title}
                  </Text>
                  
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
    </SafeAreaView>
  );
};

export default PopularMovies;

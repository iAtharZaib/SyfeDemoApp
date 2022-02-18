import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList, Image, SafeAreaView, StatusBar,
  Text, TouchableOpacity, View
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { useDispatch, useSelector } from 'react-redux';
import { APIKEY, BASEURL, IMAGEPATH } from '../../const/config';
import { set_popularMoviesList } from '../../store/actions/mainActionCreator';
import styles from './styles';
const {width, height} = Dimensions.get('window');
const PopularMovies = () => {

  const popularMoviesListRedux = useSelector(
    (state) => state.mainReducer.popularMoviesList,
  );

  const [popularMovies, setpopularMovies] = useState(popularMoviesListRedux)
  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    getPopularMoviesList();
  }, []);



  function getPopularMoviesList () {
    if(popularMoviesListRedux && popularMoviesListRedux?.length <= 0 ) {
      setisLoading(true)
    axios
      .get(`${BASEURL}popular?api_key=${APIKEY}`)
      .then(response => {
        setpopularMovies(response.data.results);
        dispatch(set_popularMoviesList(response.data.results))
        setisLoading(false)
      })
      .catch(error => {
        setisLoading(false)
        console.log(error);
      });
    }
      else 
      {
        console.log("Already")
      }
  };

  return isLoading ? (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        alignItems="center"
        padding="20%"
        marginTop="30%">
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={height * 0.09}
          marginBottom="10%"
          borderRadius={20}
        />
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={height * 0.09}
          marginBottom="10%"
          borderRadius={20}
        />
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={height * 0.09}
          marginBottom="10%"
          borderRadius={20}
        />
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={height * 0.09}
          marginBottom="10%"
          borderRadius={20}
        />
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={height * 0.09}
          marginBottom="10%"
          borderRadius={20}
        />
        <SkeletonPlaceholder.Item
          width={width * 0.9}
          height={height * 0.09}
          marginBottom="10%"
          borderRadius={20}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder> ) :(
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} />
        <View
          style={styles.sectionContainer}>
          <Text style={styles.titleText}>Popular Movies</Text>
        </View>

        <FlatList
          keyExtractor={item => item.id}
          data={popularMovies}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity
              style={styles.itemStyling}>
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

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Dimensions, FlatList, Image, SafeAreaView, StatusBar,
  Text, TouchableOpacity, View
} from 'react-native';
import  Icon  from 'react-native-vector-icons/dist/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { APIKEY, BASEURL, IMAGEPATH } from '../../const/config';
import { set_latestMoviesList } from '../../store/actions';
import { COLORS } from '../../utils/Colors';
import styles from './styles';

const {width, height} = Dimensions.get('window');
const LatestMovies = (props) => {

  const latestMoviesListRedux = useSelector(
    (state) => state.mainReducer.latestMoviesList,
  );
  
  const [latestMovies, setlatestMovies] = useState(latestMoviesListRedux)
  const dispatch = useDispatch();


  useEffect(() => {
    getLatestMoviesList();
  }, []);

  
  function getLatestMoviesList () {
    axios
      .get(`${BASEURL}latest?api_key=${APIKEY}`)
      .then(response => {
        let data={};
        data.id=response.data.id;
        data.title=response.data.title;
        data.original_title=response.data.original_title;
        setlatestMovies([...latestMovies,...data]);
        dispatch(set_latestMoviesList([...latestMovies,...data]))
        console.log(response, 'if chla');
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
        <Text style={styles.titleText}>Latest Movies</Text>
        </View>
      </View>

        <FlatList
          keyExtractor={item => item.id}
          data={latestMovies}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index,}) => (
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

export default LatestMovies;

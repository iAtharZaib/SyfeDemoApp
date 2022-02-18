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
import { useDispatch,useSelector } from 'react-redux';
import {APIKEY, BASEURL, IMAGEPATH} from '../../const/config';
import { set_latestMoviesList, set_moviesList, set_popularMoviesList } from '../../store/actions/mainActionCreator';
import {COLORS} from '../../utils/Colors';
import styles from './styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
const {width, height} = Dimensions.get('window');
const Home = () => {

  
  const [moviesList, setmoviesList] = useState([]);

  const [isLoading, setisLoading] = useState(false)
  const dispatch = useDispatch();


  useEffect(() => {
    getMoviesList();
  }, []);


  getMoviesList = () => {
    if(moviesList && moviesList?.length <= 0 ) {
      setisLoading(true)
    axios
      .get(`${BASEURL}upcoming?api_key=${APIKEY}`)
      .then(response => {
        setisLoading(false)
        setmoviesList(response.data.results);
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
          <Text style={styles.titleText}>Home</Text>
        </View>

        <FlatList
          keyExtractor={item => item.id}
          data={moviesList}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index, separators}) => (
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

export default Home;

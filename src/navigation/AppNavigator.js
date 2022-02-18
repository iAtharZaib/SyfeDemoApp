import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import MyTabBar from '../components/TabBar/TabBar';
import Home from '../screens/Home';
import LatestMovies from '../screens/LatestMovies';
import MovieDetails from '../screens/MovieDetails';
import MoviesList from '../screens/MoviesList';
import PopularMovies from '../screens/PopularMovies';

const Tab = createBottomTabNavigator();
const bottomTabs = [
  {
    id: 1,
    name: 'Home',
    component: Home,
  },
  {
    id: 2,
    name: 'Movies List',
    component: MoviesList,
  },
  {
    id: 3,
    name: 'Popular Movies',
    component: PopularMovies,
  },
  {
    id: 4,
    name: 'Latest Movies',
    component: LatestMovies,
  },
  {
    id: 5,
    name: 'Movie Details',
    component: MovieDetails,
  },
];

export default function AppNav() {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />} >
      {bottomTabs.map((value) => {
        return (
          <Tab.Screen
            key={value.id}
            name={value.name}
            component={value.component}
            initialParams={{coordinates: 'noCor'}}
          />
        );
      })}
    </Tab.Navigator>
  );
    }
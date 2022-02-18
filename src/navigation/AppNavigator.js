import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import MoviesList from '../screens/MoviesList';
import PopularMovies from '../screens/PopularMovies';
import LatestMovies from '../screens/LatestMovies';
import MovieDetails from '../screens/MovieDetails';
import MyTabBar from '../components/TabBar/TabBar';

const Stack = createNativeStackNavigator();
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
    id: 4,
    name: 'Movie Details',
    component: MovieDetails,
  },
];

export function AppTabs() {
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
export default function AppNav() {
  return (
    
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName="Home">
         <Stack.Screen name="Home" component={AppTabs} />
        <Stack.Screen name="MoviesList" component={MoviesList} />
        <Stack.Screen name="PopularMovies" component={PopularMovies} />
        <Stack.Screen name="LatestMovies" component={LatestMovies} />
        <Stack.Screen name="MovieDetails" component={MovieDetails} />
      </Stack.Navigator>
    
  );
}
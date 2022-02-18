import React from 'react';
import {Dimensions, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../utils/Colors';
import styles from './styles';
const {width, height} = Dimensions.get('window');

export default function MyTabBar({state, descriptors, navigation}) {
  let states=state.routes.slice(0,4)
  return [
    <View style={styles.tabBarStyle}>
      
      {states.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        let focusIcon = 'car-sport-outline',
          tabIcon = 'home-outline';

        switch (label) {
          case 'Home':
            focusIcon = 'home';
            tabIcon = 'home-outline';
            break;
          case 'Movies List':
            focusIcon = 'play';
            tabIcon = 'play-outline';
            break;
          case 'Popular Movies':
            focusIcon = 'paper-plane';
            tabIcon = 'paper-plane-outline';
            break;
          case 'Latest Movies':
            focusIcon = 'volume-high';
            tabIcon = 'volume-high-outline';
            break;
          case 'Movie Details':
            focusIcon = 'volume-low';
            tabIcon = 'volume-low-outline';
            break;
          default:
            focusIcon = 'car-sport-outline';
            tabIcon = 'home-outline';
        }
        return (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{...styles.tabStyle}}>
            <View style={styles.imgCont}>
              {isFocused ? (
                <>
                  <Icon color={COLORS.WHITE} size={22} style={styles.focusTab} name={tabIcon} />
                  <Text
                    style={{
                      fontSize: width * 0.025,
                      marginTop: height * 0.004,
                      color: COLORS.WHITE,
                    }}>
                    {label}
                  </Text>
                </>
              ) : (
                <>
                  <Icon color={COLORS.WHITE} size={22} style={styles.focusTab} name={focusIcon} />
                </>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>,
  ];
}

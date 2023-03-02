import {BottomTabBar} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../../../assets/themes';

export default function CustomTabBar(props) {
  return (
    <View>
      <View style={styles.tabBar} />
      <BottomTabBar {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#EEEFF9',
    position: 'absolute',
    right: 10,
    left: 10,
    bottom: 38,
    height: 20,
    borderRadius: 10,
    shadowColor: COLORS.black,
    borderWidth: 1,
    borderColor: 'red',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 3,
  },
});

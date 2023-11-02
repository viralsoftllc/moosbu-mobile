import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import {COLORS} from '../assets/themes';

const Test = () => {
  const {width} = Dimensions.get('window');
  return (
    <View
      style={{
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      <SkeletonPlaceholder>
        <View style={{marginTop: 10, marginBottom: 30}}>
          <View
            style={{
              marginTop: 6,
              width: width - 50,
              height: 200,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
          <View
            style={{
              marginTop: 20,
              width: width - 50,
              height: 50,
              borderRadius: 4,
            }}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default Test;

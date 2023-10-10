import {View, Text} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../../assets/themes';

const HalfScreen = ({children}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-end',
      }}>
      <View
        style={
          {
            // flex: 1
          }
        }></View>
      <View
        style={{
          // flex: 1,
          backgroundColor: COLORS.white,
          paddingHorizontal: SIZES.paddingHorizontal,
          paddingTop: SIZES.base,
          paddingBottom: SIZES.base * 2,
          borderTopLeftRadius: SIZES.radius * 2,
          borderTopRightRadius: SIZES.radius * 2,
        }}>
        {children}
      </View>
    </View>
  );
};

export default HalfScreen;

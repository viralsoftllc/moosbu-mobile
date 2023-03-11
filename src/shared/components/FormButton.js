/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, SIZES} from '../../assets/themes';

export default function FormButton({
  title,
  fullWidth,
  buttonStyle,
  textStyle,
  onPress,
  disabled,
}) {
  return (
    <View
      style={[
        styles.container,
        {paddingHorizontal: fullWidth ? 0 : SIZES.paddingHorizontal},
      ]}>
      <Pressable
        style={[
          styles.btn,
          {backgroundColor: disabled ? COLORS.grayText : COLORS.primary},
          buttonStyle,
        ]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    // backgroundColor: COLORS.primary,
    height: verticalScale(48),
    borderRadius: SIZES.radius,
  },

  text: {
    color: COLORS.white,
  },
});

/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../assets/themes';

export default function AppButton({title, rightIcon, leftIcon, buttonStyle}) {
  return (
    <Pressable style={[styles.container, buttonStyle]}>
      {leftIcon}

      <Text
        style={[
          styles.text,
          {
            marginRight: rightIcon ? SIZES.base : 0,
            marginLeft: leftIcon ? SIZES.base : 0,
          },
        ]}>
        {title}
      </Text>

      {rightIcon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.base / 2,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius / 4,
  },
  text: {
    color: COLORS.white,
    ...FONTS.small,
  },
});

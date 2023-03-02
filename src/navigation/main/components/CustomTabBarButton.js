/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, Platform, View} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../../assets/themes';

export default function CustomTabBarButton({
  route,
  children,
  accessibilityState,
  onPress,
  label,
}) {
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={[styles.btn]}>
      <View
        style={[
          styles.btnView,
          {
            backgroundColor: accessibilityState.selected
              ? 'rgba(118, 163, 224, 0.1)'
              : 'transparent',
          },
        ]}>
        {children}
        <Text
          style={{
            color: accessibilityState.selected
              ? COLORS.secondary
              : COLORS.textPrimary,
            ...FONTS.small,
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btnView: {
    marginBottom: Platform.OS === 'android' ? SIZES.base : 0,
    paddingHorizontal: 10,
    borderRadius: SIZES.radius,
    paddingVertical: SIZES.base / 5,
  },
});

import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/themes';

export default function MenuTabBarButton({
  route,
  children,
  accessibilityState,
  onPress,
}) {
  return (
    <View style={styles.btnWrapper}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={onPress}
        style={[styles.btn]}>
        {children}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    flex: 1,
    position: 'absolute',
    top: -36,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: COLORS.white,
  },
});

import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {COLORS, SIZES, FONTS} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';

export default function ImagePicker() {
  return (
    <Pressable style={styles.container}>
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="camera-outline"
        color={COLORS.textGray}
      />
      <Text style={styles.description}>Add product images up to 8 images</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.tabBg,
    height: 93,
    borderRadius: SIZES.radius / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SIZES.base * 2,
  },
  description: {
    ...FONTS.medium,
    color: COLORS.textGray,
    marginTop: SIZES.base / 2,
  },
});

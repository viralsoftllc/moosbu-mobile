/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, SIZES} from '../../assets/themes';
import icons from '../constants/icons';

export default function ImageIcon({
  imageUrl,
  rounded,
  size,
  margin = SIZES.base,
  style,
}) {
  //   console.log(imageUrl);
  function getSource() {
    if (typeof imageUrl === 'number') {
      return imageUrl;
    }

    if (imageUrl) {
      return {uri: imageUrl};
    }

    return icons.avatar;
  }

  return (
    <View
      style={[
        styles.imageBox,
        {
          borderRadius: rounded ? 100 : 4,
          height: size || verticalScale(40),
          width: size || verticalScale(40),
          margin,
        },
        style,
      ]}>
      <Image
        source={getSource()}
        resizeMode={rounded ? 'cover' : 'contain'}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: '100%',
    width: '100%',
  },
  imageBox: {
    overflow: 'hidden',
    borderColor: COLORS.grey2,
  },
});

import React from 'react';
import {Image, Pressable, StyleSheet, View} from 'react-native';

import {verticalScale} from 'react-native-size-matters';
import {COLORS, SIZES, FONTS} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';

export default function ImagePicker({fileResponse, images, handleDeleteImage}) {
  return (
    <>
      {fileResponse?.length ? (
        <View style={styles.images}>
          {fileResponse.map((file, index) => (
            <View style={styles.imageContainer} key={index}>
              <Pressable
                style={styles.delete}
                onPress={() => handleDeleteImage(file)}>
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="minus-circle"
                  color={COLORS.red}
                />
              </Pressable>

              <Pressable style={[styles.imageView]}>
                <Image
                  source={{uri: file?.uri}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}

      {images?.length ? (
        <View style={styles.images}>
          {images?.map((img, i) => (
            <View style={styles.imageContainer} key={i}>
              <Pressable
                style={styles.delete}
                onPress={() => handleDeleteImage(img)}>
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="minus-circle"
                  color={COLORS.red}
                />
              </Pressable>

              <Pressable style={[styles.imageView]}>
                <Image
                  source={{uri: img?.product_image}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
          ))}
        </View>
      ) : null}
    </>
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
  imageView: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    marginBottom: SIZES.base / 2,
  },
  imageContainer: {
    height: verticalScale(100),
    width: '30%',
    overflow: 'hidden',
    margin: '1%',
    position: 'relative',
    marginBottom: SIZES.base,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  images: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SIZES.base * 2,
  },
  edit: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.borderGray,
  },
  delete: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    paddingRight: SIZES.base,
    paddingBottom: SIZES.base,
  },
});

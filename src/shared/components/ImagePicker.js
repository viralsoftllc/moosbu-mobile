import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
// import DocumentPicker from 'react-native-document-picker';

import {COLORS, SIZES, FONTS} from '../../assets/themes';
import UseIcon from '../utils/UseIcon';
import {verticalScale} from 'react-native-size-matters';

export default function ImagePicker({
  fileResponse,
  setFileResponse,
  handleDocumentSelection,
}) {
  // const [fileResponse, setFileResponse] = useState([]);

  return (
    <>
      {fileResponse?.length ? (
        <View style={styles.images}>
          <Pressable
            style={[styles.imageView, styles.edit]}
            onPress={handleDocumentSelection}>
            <Text style={styles.description}>Edit</Text>
          </Pressable>

          {fileResponse.map((file, index) => (
            <Pressable key={index} style={styles.imageView}>
              <Image
                source={{uri: file?.uri}}
                style={styles.image}
                resizeMode="contain"
              />
            </Pressable>
          ))}
        </View>
      ) : null}

      {fileResponse?.length ? null : (
        <Pressable style={styles.container} onPress={handleDocumentSelection}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="camera-outline"
            color={COLORS.textGray}
          />
          <Text style={styles.description}>
            Add product images up to 8 images
          </Text>
        </Pressable>
      )}
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
    height: verticalScale(100),
    // width: verticalScale(100),
    width: '30%',
    // borderWidth: 1,
    overflow: 'hidden',
    margin: '1%',
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
    borderWidth: 1,
    borderColor: COLORS.borderGray,
  },
});

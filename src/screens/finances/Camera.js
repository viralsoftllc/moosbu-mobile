import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from '../../shared/components/ImagePicker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Camera = () => {
  const [img, setImg] = useState(null);

  const handlePress = async () => {
    await launchCamera(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
      },
      res => {
        // console.log(res);
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          console.log(res.assets[0]);

          setImg(res.assets[0].uri);
        }
      },
    );
  };

  const handleSelectImage = async () => {
    await launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        selectionLimit: 1,
      },
      res => {
        // console.log('res from image picker - cover image');
        // console.log(res);
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          console.log(res.assets);
          setImg(res.assets[0].uri);
        }
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}>
      <Text onPress={handlePress}>Camera</Text>
      {img && (
        <Image
          source={{uri: img}}
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode="contain"
        />
      )}

      <Text onPress={handleSelectImage}>Open Gallery</Text>
    </View>
  );
};

export default Camera;

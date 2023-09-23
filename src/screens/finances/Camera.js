import {View, Text} from 'react-native';
import React from 'react';
import ImagePicker from '../../shared/components/ImagePicker';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const Camera = () => {
  const handlePress = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        mediaType: 'photo',
      },
    };
    console.log('Pressed');
    await launchCamera(options, res => {
      console.log(res);
      if (res.didCancel) {
        // user cancelled image picker
      } else if (res.error) {
        // error opening image picker
      } else {
        //   setFileResponse(res.assets);
      }
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text onPress={handlePress}>Camera</Text>
    </View>
  );
};

export default Camera;

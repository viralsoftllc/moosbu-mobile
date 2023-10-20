import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
  Image,
  Text,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImageToCloudinary} from '../../shared/hooks/uploadToCloudinary';

import {COLORS, SIZES} from '../../assets/themes';
import {selectStoreDetails} from '../../redux/slices/store/selectors';
import {selectUser} from '../../redux/slices/user/selectors';
import {setUserDetails} from '../../redux/slices/user/slice';
import ImageIcon from '../../shared/components/ImageIcon';
import ScreenHeader from '../../shared/components/ScreenHeader';
import UseIcon from '../../shared/utils/UseIcon';
import ProfileForm from './renderer/ProfileForm';
import client from '../../shared/api/client';
import handleApiError from '../../shared/components/handleApiError';
import notifyMessage from '../../shared/hooks/notifyMessage';

export default function Profile() {
  const [loading, setLoading] = useState(false);

  const {setOptions} = useNavigation();
  const user = useSelector(selectUser);
  const store = useSelector(selectStoreDetails);
  const [profile, setProfile] = useState({});

  const dispatch = useDispatch();

  //Image picker variables
  const [uri, setUri] = useState('');
  const [fileResponse, setFileResponse] = useState({});

  //handle image from gallery
  const handleGallery = async () => {
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
          setUri(res.assets[0].uri);
          setFileResponse(res.assets[0]);
        }
      },
    );
  };

  //Upload image in bit64 format to get url
  async function uploadToGetUrl(base64) {
    try {
      const data = await uploadImageToCloudinary(base64);
      return data?.url;
    } catch (error) {
      console.log('error');
      return error;
    }
  }

  const handleUpdate = async () => {
    setLoading(true);
    const userImage = await uploadToGetUrl(fileResponse?.base64);
    console.log(userImage);
    try {
      const res = await client.put('/api/update/user', {
        avatar: userImage,
      });

      const {data} = res.data;
      console.log(res.data);
      dispatch(setUserDetails(data));
      notifyMessage('Success');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  useEffect(() => {
    setProfile({
      name: user?.name || '',
      email: user?.email || '',
      phone_number: user?.phone_number || '',
      avatar: user?.avatar,
    });

    return () => {};
  }, [user, store]);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'My Profile'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Platform.OS == 'ios' ? 20 : 0,
          paddingBottom: 100,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageIcon}>
          {profile?.avatar !== 'avatar.png' || uri ? (
            <Image
              source={{uri: profile?.avatar || uri}}
              style={{
                width: 150,
                height: 150,
                alignSelf: 'center',
                borderRadius: 75,
              }}
              resizeMode="cover"
            />
          ) : (
            <ImageIcon size={verticalScale(100)} margin={0} />
          )}

          <Pressable style={styles.cameraView} onPress={handleGallery}>
            <UseIcon
              type={'AntDesign'}
              name="camerao"
              color={COLORS.secondary}
            />
          </Pressable>
        </View>

        <ProfileForm
          profile={profile}
          setProfile={setProfile}
          loading={loading}
          handleUpdate={handleUpdate}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  imageIcon: {
    alignSelf: 'center',
    marginTop: '10%',
    position: 'relative',
    marginBottom: SIZES.base * 4,
  },
  cameraView: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: SIZES.base / 1.5,
    backgroundColor: COLORS.white,
    borderRadius: 100,
  },
});

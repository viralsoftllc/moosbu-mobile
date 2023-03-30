import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

import {COLORS, SIZES} from '../../assets/themes';
import {selectStoreDetails} from '../../redux/slices/store/selectors';
import {selectUser} from '../../redux/slices/user/selectors';
import ImageIcon from '../../shared/components/ImageIcon';
import ScreenHeader from '../../shared/components/ScreenHeader';
import UseIcon from '../../shared/utils/UseIcon';
import ProfileForm from './renderer/ProfileForm';

export default function Profile() {
  const {setOptions} = useNavigation();
  const user = useSelector(selectUser);
  const store = useSelector(selectStoreDetails);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile({
      name: store?.name || '',
      email: user?.email || '',
      phone_number: store?.phone_number || '',
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
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageIcon}>
          <ImageIcon size={verticalScale(100)} margin={0} />

          <Pressable style={styles.cameraView}>
            <UseIcon
              type={'AntDesign'}
              name="camerao"
              color={COLORS.secondary}
            />
          </Pressable>
        </View>

        <ProfileForm profile={profile} setProfile={setProfile} />
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

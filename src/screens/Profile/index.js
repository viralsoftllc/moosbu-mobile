import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES} from '../../assets/themes';
import ImageIcon from '../../shared/components/ImageIcon';
import ScreenHeader from '../../shared/components/ScreenHeader';
import UseIcon from '../../shared/utils/UseIcon';
import ProfileForm from './renderer/ProfileForm';

export default function Profile() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'My Profile'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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

        <ProfileForm />
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

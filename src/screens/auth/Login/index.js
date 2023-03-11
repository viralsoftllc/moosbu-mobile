import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import routes from '../../../shared/constants/routes';
import UseIcon from '../../../shared/utils/UseIcon';
import LoginForm from './renderer/LoginForm';

export default function Login() {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            source={require('../../../assets/images/moosbuwhite.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.welcomeTextView}>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name={'hand-wave'}
            color={'#6A462F'}
            size={verticalScale(12)}
          />
        </View>

        <Text style={styles.subheader}>
          Excited to see you are back. You can continue to track and record your
          business growth and sale.
        </Text>

        <LoginForm />

        <Pressable onPress={() => navigate(routes.REGISTRATION)}>
          <Text style={styles.registerLink}>
            Don’t have a Moosbu account yet?{' '}
            <Text style={styles.linkText}>Sign up</Text>
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
  },
  welcomeTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    marginRight: SIZES.base / 2,
    ...FONTS.h6,
    fontWeight: '300',
    color: COLORS.textSecondary,
  },
  subheader: {
    color: COLORS.grayText,
    marginTop: SIZES.base / 2,
    ...FONTS.medium,
    marginBottom: SIZES.base * 5,
  },
  imageView: {
    // height: verticalScale(220),
    marginBottom: SIZES.base * 3,
    marginTop: '5%',
  },
  // image: {
  //   height: '100%',
  // },
  registerLink: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  linkText: {
    color: COLORS.textSecondary,
  },
});

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
import RegistrationForm from './renderer/RegistrationForm';

export default function Register() {
  const {navigate} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.welcomeTextView}>
          <Text style={styles.welcomeText}>Create A New Account</Text>
        </View>

        <Text style={styles.subheader}>
          Create an account to improve the growth of your business
        </Text>

        <View style={styles.imageView}>
          <Image
            source={require('../../../assets/images/registration.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <RegistrationForm />

        <Pressable onPress={() => navigate(routes.LOGIN)}>
          <Text style={styles.registerLink}>
            You already have an account?{' '}
            <Text style={styles.linkText}>Log in</Text>
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
  },
  imageView: {
    height: verticalScale(220),
    marginVertical: SIZES.base * 3,
  },
  image: {
    height: '100%',
  },
  registerLink: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  linkText: {
    color: COLORS.textSecondary,
  },
});

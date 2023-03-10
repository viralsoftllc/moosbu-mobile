import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
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
import RegistrationForm from './renderer/RegistrationForm';

export default function Register() {
  const {navigate, goBack} = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.iconWrapper} onPress={goBack}>
        <UseIcon
          type={'MaterialIcons'}
          name="arrow-back"
          color={COLORS.textPrimary}
        />
      </Pressable>

      <ScrollView>
        <View style={styles.welcomeTextView}>
          <Text style={styles.welcomeText}>Create A New Account</Text>
        </View>

        <Text style={styles.subheader}>
          Create an account to improve the growth of your business
        </Text>

        {/* <View style={styles.imageView}>
          <Image
            source={require('../../../assets/images/registration.png')}
            resizeMode="contain"
            style={styles.image}
          />
        </View> */}

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
    paddingVertical: SIZES.base,
  },
  welcomeTextView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '3%',
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
    marginBottom: SIZES.base * 4,
  },
  registerLink: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  linkText: {
    color: COLORS.textSecondary,
  },
  iconWrapper: {
    alignSelf: 'flex-start',
    height: verticalScale(30),
    paddingRight: SIZES.base,
    marginBottom: SIZES.base,
  },
});

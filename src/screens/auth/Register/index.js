import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import routes from '../../../shared/constants/routes';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import Cache from '../../../shared/utils/Cache';
import UseIcon from '../../../shared/utils/UseIcon';
import RegistrationForm from './renderer/RegistrationForm';

export default function Register() {
  const {navigate, goBack} = useNavigation();

  const [loading, setLoading] = useState(false);
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    password_confirmation: '',
    store_name: '',
    name: '',
    phone_number: '',
    referred_by: '',
  });

  async function register() {
    console.log('credentials');
    console.log(credentials);

    if (!credentials?.email) {
      return notifyMessage('Email is required');
    }
    if (!credentials?.name) {
      return notifyMessage('Full Name is required');
    }
    if (!credentials?.phone_number) {
      return notifyMessage('Phone number is required');
    }
    if (!credentials?.store_name) {
      return notifyMessage('Store name is required');
    }
    if (!credentials?.password) {
      return notifyMessage('Password is required');
    }
    if (!credentials?.password_confirmation) {
      return notifyMessage('Password is required');
    }
    if (credentials?.password !== credentials?.password_confirmation) {
      return notifyMessage('Passwords does not match');
    }
    if (!agreePolicy) {
      return notifyMessage(
        'Please agree to our terms of service and privacy policy',
      );
    }

    setLoading(true);

    try {
      console.log('Registration Api started');
      const res = await client.post('/api/register', credentials);
      console.log('response from API');
      console.log(res);
      const {data} = res;
      console.log('data extracted');
      console.log(data);

      setLoading(false);

      Cache.storeString('@token', data?.token);
      Cache.storeObject('@user', data?.user);

      setLoading(false);
      navigate(routes.LOGIN, {email: credentials.email});
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.iconWrapper} onPress={goBack}>
        <UseIcon
          type={'MaterialIcons'}
          name="arrow-back"
          color={COLORS.textPrimary}
        />
      </Pressable>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
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

        <RegistrationForm
          credentials={credentials}
          setCredentials={setCredentials}
          loading={loading}
          register={register}
          setAgreePolicy={setAgreePolicy}
          agreePolicy={agreePolicy}
        />

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
    paddingVertical: SIZES.base * 2,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
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
    paddingLeft: SIZES.paddingHorizontal,
  },
});

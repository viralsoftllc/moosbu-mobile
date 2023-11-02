import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {setToken} from '../../../redux/slices/auth/slice';
import {setUserDetails} from '../../../redux/slices/user/slice';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import routes from '../../../shared/constants/routes';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import Cache from '../../../shared/utils/Cache';
import UseIcon from '../../../shared/utils/UseIcon';
import LoginForm from './renderer/LoginForm';

export default function Login() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({email: '', password: ''});

  async function login() {
    if (!credentials?.email) {
      return notifyMessage('Email cannot be empty');
    }
    if (!credentials?.password) {
      return notifyMessage('Password cannot be empty');
    }

    setLoading(true);

    try {
      const {data} = await client.post('/api/login', credentials);

      Cache.storeString('@token', data?.token);
      Cache.storeObject('@user', data?.user);

      setLoading(false);
      console.log(data.token);

      dispatch(setUserDetails(data?.user));
      dispatch(setToken(data?.token));
    } catch (error) {
      console.log('error');
      console.log(error);
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.imageView}>
          <Image
            source={require('../../../assets/images/moosbuu.png')}
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
        {/* <Pressable onPress={() => navigate('BasicDetails')}>
          <Text>Wallet</Text>
        </Pressable> */}

        <LoginForm
          setCredentials={setCredentials}
          credentials={credentials}
          loading={loading}
          login={login}
        />

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
    paddingBottom: SIZES.base,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
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
    height: verticalScale(37),
    width: verticalScale(157),
    marginBottom: SIZES.base * 4,
    marginTop: '10%',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  registerLink: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    textAlign: 'center',
  },
  linkText: {
    color: COLORS.textSecondary,
  },
});

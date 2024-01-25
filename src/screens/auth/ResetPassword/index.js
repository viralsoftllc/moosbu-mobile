import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';

import client from '../../../shared/api/client';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import handleApiError from '../../../shared/components/handleApiError';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import ResetPasswordForm from './renderer/ResetPasswordForm';

import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';

export default function ResetPassword() {
  const {navigate} = useNavigation();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function resetPassword() {
    console.log(email);
    if (!email) {
      return notifyMessage('Email is required');
    }

    setLoading(true);

    try {
      console.log('Api called');
      const {data} = await client.post('/api/reset_password', {email});
      console.log('response');
      console.log(data);

      setLoading(false);
      navigate(routes.RESET_PASSWORD_DONE);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.welcomeTextView}>
          <Text style={styles.welcomeText}>Reset Password</Text>
        </View>

        <Text style={styles.subheader}>
          Enter email associated with your account and we will send an email
          with the instructions to reset your password
        </Text>

        <ResetPasswordForm
          email={email}
          setEmail={setEmail}
          loading={loading}
          resetPassword={resetPassword}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    flexGrow: 1,
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
  iconWrapper: {
    alignSelf: 'flex-start',
    height: verticalScale(30),
    paddingRight: SIZES.base,
    marginBottom: SIZES.base,
  },
});

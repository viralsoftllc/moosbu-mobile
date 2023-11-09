import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import ChangePasswordForm from './renderer/ChangePasswordForm';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';
import Test from '../../Test';
import {UseSelector, useSelector} from 'react-redux';
import {selectUser} from '../../../redux/slices/user/selectors';

export default function ChangePassword() {
  const {setOptions} = useNavigation();

  const user = useSelector(selectUser);

  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({email: user.email});

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader />,
    });
  }, [setOptions]);

  const handleChangePassword = async () => {
    // if (credentials.new_password !== credentials.confirm_new_password) {
    //   return notifyMessage('New passwords do not match');
    // }
    setLoading(true);
    try {
      const res = await client.post('/api/reset_password', credentials);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <Test />
      ) : (
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <Text style={styles.welcomeText}>Create New Password</Text>

          <ChangePasswordForm
            credentials={credentials}
            setCredentials={setCredentials}
            handleChangePassword={handleChangePassword}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  welcomeText: {
    marginRight: SIZES.base / 2,
    ...FONTS.h6,
    fontWeight: '300',
    color: COLORS.textSecondary,
    marginTop: SIZES.base,
    textAlign: 'center',
    marginBottom: SIZES.base * 3,
  },
});

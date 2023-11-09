import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';

export default function ChangePasswordForm({
  handleChangePassword,
  credentials,
  setCredentials,
}) {
  const {goBack} = useNavigation();
  const [loading, setLoading] = useState(false);

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FormInput
        placeholder={'Enter your old password'}
        secureTextEntry={!passwordIsVisible}
        onChangeText={text =>
          setCredentials({...credentials, old_password: text})
        }
        rightIcon={
          <Pressable onPress={() => setPasswordIsVisible(!passwordIsVisible)}>
            <UseIcon
              type={'Ionicons'}
              name={passwordIsVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.textPrimary}
            />
          </Pressable>
        }
      />
      <FormInput
        placeholder={'Enter your new password'}
        secureTextEntry={!newPasswordVisible}
        onChangeText={text =>
          setCredentials({...credentials, new_password: text})
        }
        rightIcon={
          <Pressable onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
            <UseIcon
              type={'Ionicons'}
              name={newPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.textPrimary}
            />
          </Pressable>
        }
      />
      <FormInput
        placeholder={'Confirm new password'}
        secureTextEntry={!newPasswordVisible}
        onChangeText={text =>
          setCredentials({...credentials, confirm_new_password: text})
        }
        rightIcon={
          <Pressable onPress={() => setNewPasswordVisible(!newPasswordVisible)}>
            <UseIcon
              type={'Ionicons'}
              name={newPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.textPrimary}
            />
          </Pressable>
        }
      />

      <FormButton
        title={'Update Password'}
        buttonStyle={styles.buttonStyle}
        onPress={() => handleChangePassword()}
      />

      <FormButton
        title={'Cancel'}
        buttonStyle={styles.cancelButtonStyle}
        textStyle={styles.textStyle}
        onPress={goBack}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: SIZES.base * 1.5,
  },
  buttonStyle: {
    backgroundColor: COLORS.primary,
    marginTop: SIZES.base * 4,
  },
  cancelButtonStyle: {
    backgroundColor: COLORS.white,
    marginTop: SIZES.base * 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  textStyle: {
    color: COLORS.primary,
  },
});

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';

export default function ResetPasswordForm({
  resetPassword,
  email,
  setEmail,
  loading,
}) {
  return (
    <View style={styles.container}>
      <FormInput
        placeholder={'Email'}
        onChangeText={text => setEmail(text)}
        value={email}
        inputMode="email"
      />

      <FormButton
        title={'Send Instructions'}
        buttonStyle={styles.buttonStyle}
        loading={loading}
        onPress={resetPassword}
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
});

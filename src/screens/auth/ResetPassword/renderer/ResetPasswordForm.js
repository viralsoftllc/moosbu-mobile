import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';
import routes from '../../../../shared/constants/routes';

export default function ResetPasswordForm({
  resetPassword,
  email,
  setEmail,
  loading,
}) {
  const {navigate} = useNavigation();

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
        onPress={() => navigate(routes.RESET_PASSWORD_DONE)}
        // onPress={resetPassword}
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

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';

export default function ResetPasswordForm() {
  return (
    <View style={styles.container}>
      <FormInput placeholder={'Email'} />
      <FormButton
        title={'Send Instructions'}
        buttonStyle={styles.buttonStyle}
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

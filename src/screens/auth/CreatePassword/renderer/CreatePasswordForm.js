import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';

export default function CreatePasswordForm() {
  return (
    <View style={styles.container}>
      <FormInput placeholder={'Enter your new password'} />
      <FormInput placeholder={'Confirm new password'} />
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

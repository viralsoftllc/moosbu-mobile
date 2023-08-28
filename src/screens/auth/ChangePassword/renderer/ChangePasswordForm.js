import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';
import FormInput from '../../../../shared/components/FormInput';

export default function ChangePasswordForm() {
  const {goBack} = useNavigation();

  return (
    <View style={styles.container}>
      <FormInput placeholder={'Enter your old password'} />

      <FormInput placeholder={'Enter your new password'} />

      <FormInput placeholder={'Confirm new password'} />

      <FormButton title={'Update Password'} buttonStyle={styles.buttonStyle} />

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

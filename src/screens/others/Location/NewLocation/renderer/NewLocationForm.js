import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewLocationForm({handleSuccessfulResponse}) {
  return (
    <View>
      <FormInput
        label={'Location Name'}
        placeholder={'Location Name'}
        style={styles.form}
      />

      <FormButton title={'Save Changes'} onPress={handleSuccessfulResponse} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: SIZES.base * 10,
  },
});

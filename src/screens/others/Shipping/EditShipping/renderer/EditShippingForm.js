import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function EditShippingForm({handleSuccessfulResponse}) {
  return (
    <View>
      <FormInput label={'Shipping Title'} placeholder={'Shipping Title'} />

      <FormInput
        label={'Shipping Price'}
        placeholder={'Enter shipping price'}
      />

      <FormInput
        label={'Shipping location'}
        placeholder={'Enter Shipping location'}
        style={styles.form}
      />

      <FormButton title={'Save Changes'} onPress={handleSuccessfulResponse} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: SIZES.base * 5,
  },
});

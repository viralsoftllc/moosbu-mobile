import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewShippingForm({
  handleSuccessfulResponse,
  setDetails,
  details,
  submitting,
  onSubmit,
}) {
  return (
    <View>
      <FormInput
        label={'Shipping Title'}
        placeholder={'Shipping Title'}
        onChangeText={text => setDetails({...details, name: text})}
        value={details?.name}
      />

      <FormInput
        label={'Shipping Price'}
        placeholder={'Enter shipping price'}
        onChangeText={text => setDetails({...details, price: text})}
        value={details?.price}
      />

      {/* <FormInput
        label={'Shipping location'}
        placeholder={'Enter Shipping location'}
        style={styles.form}
      /> */}

      <FormButton
        title={'Save Changes'}
        onPress={onSubmit}
        loading={submitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: SIZES.base * 5,
  },
});

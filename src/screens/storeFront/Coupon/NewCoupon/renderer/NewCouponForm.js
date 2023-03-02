import React from 'react';
import {StyleSheet, View} from 'react-native';

import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewCouponForm() {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <FormInput label={'Coupon Name'} placeholder="Enter coupon name" />

        <FormInput label={'Coupon Percent'} placeholder="Enter coupon price" />

        <FormInput
          label={'Coupon Description'}
          placeholder="Enter Coupon Details"
          multiline={true}
          numberOfLines={5}
          inputStyle={styles.inputStyle}
        />
      </View>

      <FormButton title={'Add Coupon'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 5,
  },
  inputs: {
    marginBottom: SIZES.base * 5,
  },
  inputStyle: {
    textAlignVertical: 'top',
  },
});

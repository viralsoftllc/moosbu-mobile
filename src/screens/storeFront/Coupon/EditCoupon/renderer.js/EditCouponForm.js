import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function EditCouponForm() {
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

      <View style={styles.response}>
        <Text style={styles.responseText}>Coupon details updated</Text>
      </View>

      <FormButton title={'Update Coupon'} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 5,
  },
  inputs: {
    marginBottom: SIZES.base * 5,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  inputStyle: {
    textAlignVertical: 'top',
  },
  response: {
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.secondary,
    marginBottom: SIZES.base * 3,
  },
  responseText: {
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.medium,
  },
});

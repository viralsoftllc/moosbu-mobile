import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../../assets/themes';
import FormButton from '../../../../../../shared/components/FormButton';
import FormInput from '../../../../../../shared/components/FormInput';

export default function NewDiscountForm() {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <FormInput label={'Discount Name'} placeholder="Enter dicount name" />

        <FormInput
          label={'Discount Percent'}
          placeholder="Enter dicount price"
        />

        <FormInput
          label={'Discount Description'}
          placeholder="Enter Dicount Details"
          multiline={true}
          numberOfLines={5}
          inputStyle={styles.inputStyle}
        />
      </View>

      <FormButton title={'Add Dicount'} />
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

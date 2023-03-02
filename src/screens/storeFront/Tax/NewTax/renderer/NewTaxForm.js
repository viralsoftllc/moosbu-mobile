import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewTaxForm() {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <FormInput label={'Tax Name'} placeholder="Enter tax name" />

        <FormInput label={'Tax Percent'} placeholder="Enter tax price" />

        <FormInput
          label={'Tax Description'}
          placeholder="Enter Tax Details"
          multiline={true}
          numberOfLines={5}
          inputStyle={styles.inputStyle}
        />
      </View>

      <FormButton title={'Add Tax'} />
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

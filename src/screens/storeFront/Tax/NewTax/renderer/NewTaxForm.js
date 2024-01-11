import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SIZES, FONTS} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewTaxForm({
  onSubmit,
  details,
  setDetails,
  submitting,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <FormInput
          label={'Tax Name'}
          placeholder="Enter tax name"
          onChangeText={text => setDetails({...details, name: text})}
          value={details?.name}
        />

        <FormInput
          label={'Tax Percent'}
          placeholder="Enter tax rate"
          onChangeText={text => setDetails({...details, rate: text})}
          value={details?.rate}
          keyboardType="numeric"
          rightIcon={<Text style={{...FONTS.regular}}>%{'   '}</Text>}
        />
      </View>

      <FormButton title={'Save'} onPress={onSubmit} loading={submitting} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 3,
  },
  inputs: {
    marginVertical: SIZES.base * 2,
  },
  inputStyle: {
    textAlignVertical: 'top',
  },
});

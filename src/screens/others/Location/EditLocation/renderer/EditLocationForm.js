import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function EditLocationForm({
  setDetails,
  details,
  submitting,
  onSubmit,
}) {
  return (
    <View>
      <FormInput
        label={'Location Name'}
        placeholder={'Location Name'}
        value={details?.name}
        onChangeText={text => setDetails({...details, name: text})}
      />

      <FormInput
        label={'Location Description'}
        placeholder={'Location Description'}
        style={styles.form}
        onChangeText={text => setDetails({...details, address: text})}
        value={details?.address}
      />

      <FormButton title={'Update'} onPress={onSubmit} loading={submitting} />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginBottom: SIZES.base * 10,
  },
});

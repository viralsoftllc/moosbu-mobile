import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewLocationForm({
  onSubmit,
  details,
  setDetails,
  submitting,
}) {
  return (
    <View>
      <FormInput
        label={'Location Name'}
        placeholder={'Location Name'}
        onChangeText={text => setDetails({...details, name: text})}
        value={details?.name}
      />

      <FormInput
        label={'Location Description'}
        placeholder={'Location Description'}
        style={styles.form}
        onChangeText={text => setDetails({...details, address: text})}
        value={details?.address}
      />

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
    marginBottom: SIZES.base * 10,
  },
});

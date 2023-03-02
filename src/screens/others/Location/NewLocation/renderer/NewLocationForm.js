import React from 'react';
import {View} from 'react-native';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewLocationForm() {
  return (
    <View>
      <FormInput label={'Location Name'} placeholder={'Location Name'} />

      <FormInput
        label={'Location description'}
        placeholder={'Enter Location description'}
      />

      <FormInput label={'Delivery Hour'} placeholder={'Enter Delivery Hour'} />

      <FormInput
        label={'Time Created'}
        placeholder={'Time delivery location is created'}
      />

      <FormButton title={'Save Changes'} />
    </View>
  );
}

import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

export default function NewSmsRequestForm({handleSuccessfulResponse}) {
  return (
    <View style={styles.container}>
      <FormInput
        label={'Sender ID for SMS'}
        placeholder="Make sure ID is not more than 11 character"
      />
      <FormInput label={'Company'} placeholder="E.g Moosu" />
      <FormInput
        label={'Use Case'}
        placeholder="It is a sample of message you will send with Moosbu"
        multiline={5}
      />

      <FormButton title={'Save'} onPress={handleSuccessfulResponse} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 2,
  },
});

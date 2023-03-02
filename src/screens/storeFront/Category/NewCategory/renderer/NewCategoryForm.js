import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

import ImagePicker from '../../../../../shared/components/ImagePicker';

export default function NewCategoryForm() {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <ImagePicker />

        <FormInput label={'Category Name'} placeholder="Enter category name" />

        <FormInput
          label={'Category Details'}
          placeholder="Enter category details"
          multiline={true}
          numberOfLines={5}
          inputStyle={styles.inputStyle}
        />
      </View>

      <FormButton title={'Add Category'} />
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

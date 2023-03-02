import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

import ImagePicker from '../../../../../shared/components/ImagePicker';

export default function NewProductForm() {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <ImagePicker />

        <FormInput label={'Product Name'} placeholder="Enter product name" />
        <FormInput
          label={'Product Category'}
          placeholder="Enter product category"
        />
        <FormInput label={'Product Price'} placeholder="Enter product price" />
        <FormInput
          label={'Stock Quantity'}
          placeholder="Enter stock quantity"
        />
        <FormInput
          label={'Product Details'}
          placeholder="Enter Product Details"
          multiline={true}
          numberOfLines={5}
        />
      </View>

      <FormButton title={'Add Product'} />
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
});

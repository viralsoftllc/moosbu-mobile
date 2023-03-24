import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import ImagePicker from '../../../../../shared/components/ImagePicker';
import UseIcon from '../../../../../shared/utils/UseIcon';

export default function NewProductForm({handleSuccessfulResponse}) {
  const [showVariantForm, setShowVariantForm] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <ImagePicker />

        <FormInput label={'Product Name'} placeholder="Enter product name" />

        <FormInput
          label={'Product Category'}
          placeholder="Enter product category"
        />

        <View style={styles.flex}>
          <FormInput
            label={'Product Price'}
            placeholder="Enter product price"
            style={[styles.smallForm, styles.leftFormInput]}
          />

          <FormInput
            label={'Product Tax'}
            placeholder="Enter product tax"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <View style={styles.flex}>
          <FormInput
            label={'Stock Quantity'}
            placeholder="Enter stock quantity"
            style={[styles.smallForm, styles.leftFormInput]}
          />

          <FormInput
            label={'Product SKU'}
            placeholder="Enter product SKU"
            style={[styles.smallForm, styles.rightFormInput]}
          />
        </View>

        <FormInput
          label={'Product Details'}
          placeholder="Enter Product Details"
          multiline={true}
          numberOfLines={5}
        />

        <Pressable
          style={[styles.flex, styles.addVariantBtn]}
          onPress={() => setShowVariantForm(!showVariantForm)}>
          <UseIcon
            name={
              showVariantForm ? 'checkbox-marked' : 'checkbox-blank-outline'
            }
            type={'MaterialCommunityIcons'}
            color={COLORS.textSecondary}
          />

          <Text style={styles.addVariantText}>Add variant</Text>
        </Pressable>

        {showVariantForm ? (
          <>
            <FormInput
              label={'Variant Description'}
              placeholder="Enter variant description"
            />
            <FormInput
              label={'Product Description'}
              placeholder="Enter product description"
            />
          </>
        ) : null}
      </View>

      <FormButton title={'Add Product'} onPress={handleSuccessfulResponse} />
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
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallForm: {
    width: '40%',
    flex: 1,
  },
  rightFormInput: {
    marginLeft: SIZES.base,
  },
  leftFormInput: {
    marginRight: SIZES.base,
  },
  addVariantText: {
    color: COLORS.textSecondary,
    marginLeft: SIZES.base,
    ...FONTS.regular,
  },
  addVariantBtn: {
    marginBottom: SIZES.base * 2,
  },
});

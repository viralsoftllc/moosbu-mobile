import React from 'react';
import {StyleSheet, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

import ImagePicker from '../../../../../shared/components/ImagePicker';

export default function EditCategoryForm({
  category,
  setCategory,
  onSubmit,
  loading,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <ImagePicker />

        <FormInput
          label={'Category Name'}
          placeholder="Enter category name"
          value={category?.name}
          onChangeText={text => setCategory({...category, name: text})}
        />

        <FormInput
          label={'Category Details'}
          placeholder="Enter category details"
          multiline={true}
          numberOfLines={5}
          inputStyle={styles.inputStyle}
          value={category?.description}
          onChangeText={text => setCategory({...category, description: text})}
        />
      </View>

      <FormButton
        title={'Update Category'}
        loading={loading}
        onPress={onSubmit}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 5,
  },
  inputs: {
    marginBottom: SIZES.base * 5,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  inputStyle: {
    textAlignVertical: 'top',
  },
  response: {
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.secondary,
    marginBottom: SIZES.base * 3,
  },
  responseText: {
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.medium,
  },
});

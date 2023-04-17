import React, {useCallback, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import ImagePicker from '../../../../../shared/components/ImagePicker';
import UseIcon from '../../../../../shared/utils/UseIcon';
import {uploadImageToS3} from '../../../../../shared/hooks/uploadImageToS3';
import SelectInput from '../../../../../shared/components/SelectInput';
import {selectCategories} from '../../../../../redux/slices/catalog/selectors';

export default function NewProductForm({
  product,
  setProduct,
  onSubmit,
  submitting,
  setSubmitting,
}) {
  const categories = useSelector(selectCategories);
  const [fileResponse, setFileResponse] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  // console.log('fileResponse');
  // console.log(fileResponse);

  const handleDocumentSelection = useCallback(async () => {
    launchImageLibrary(
      {
        maxHeight: 500,
        maxWidth: 500,
        quality: 0.4,
        mediaType: 'photo',
        includeBase64: true,
        saveToPhotos: false,
        selectionLimit: 8,
      },
      res => {
        if (res.didCancel) {
          // user cancelled image picker
        } else if (res.error) {
          // error opening image picker
        } else {
          setFileResponse(res.assets);
        }
      },
    );
  }, []);

  async function handleUpload() {
    setSubmitting(true);

    const response = await Promise.all(
      fileResponse?.map(async (file, i) => {
        const data = await uploadImageToS3(file);
        return {imageUrl: data?.Location, key: data?.Key};
      }),
    );

    // console.log('response');
    // console.log(response);

    onSubmit(response);
  }

  function handleVariant() {
    if (product?.enable_product_variant === 'on') {
      setProduct({...product, enable_product_variant: 'off'});
    }

    if (product?.enable_product_variant === 'off') {
      setProduct({...product, enable_product_variant: 'on'});
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <ImagePicker
          fileResponse={fileResponse}
          setFileResponse={setFileResponse}
          handleDocumentSelection={handleDocumentSelection}
        />

        <FormInput
          label={'Product Name'}
          placeholder="Enter product name"
          onChangeText={text => setProduct({...product, name: text})}
          value={product?.name || ''}
        />

        <SelectInput
          label={'Product Category'}
          placeholder={'Select Category'}
          onChange={option => {
            setSelectedCategory(option);
            setProduct({...product, product_category: option?.name});
          }}
          value={selectedCategory?.name}
          options={categories || []}
          keyExtractor={item => item.id}
          labelExtractor={item => item.name}
        />

        {/* <FormInput
          label={'Product Category'}
          placeholder="Enter product category"
          onChangeText={text =>
            setProduct({...product, product_category: text})
          }
          value={product?.product_category || ''}
        /> */}

        <View style={styles.flex}>
          <FormInput
            label={'Product Price'}
            placeholder="Enter product price"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setProduct({...product, price: text})}
            value={product?.price || ''}
          />

          <FormInput
            label={'Product Tax'}
            placeholder="Enter product tax"
            style={[styles.smallForm, styles.rightFormInput]}
            // onChangeText={text => setProduct({...product, tax: text})}
            // value={product?.tax || '}
          />
        </View>

        <View style={styles.flex}>
          <FormInput
            label={'Stock Quantity'}
            placeholder="Enter stock quantity"
            style={[styles.smallForm, styles.leftFormInput]}
            onChangeText={text => setProduct({...product, quantity: text})}
            value={product?.quantity || ''}
          />

          <FormInput
            label={'Product SKU'}
            placeholder="Enter product SKU"
            style={[styles.smallForm, styles.rightFormInput]}
            onChangeText={text => setProduct({...product, SKU: text})}
            value={product?.SKU || ''}
          />
        </View>

        <FormInput
          label={'Product description'}
          placeholder="Enter Product description"
          multiline={true}
          numberOfLines={5}
          onChangeText={text => setProduct({...product, description: text})}
          value={product?.description || ''}
        />

        {/* <Pressable
          style={[styles.flex, styles.addVariantBtn]}
          onPress={handleVariant}>
          <UseIcon
            name={
              product?.enable_product_variant === 'on'
                ? 'checkbox-marked'
                : 'checkbox-blank-outline'
            }
            type={'MaterialCommunityIcons'}
            color={COLORS.textSecondary}
          />

          <Text style={styles.addVariantText}>Add variant</Text>
        </Pressable> */}

        {product?.enable_product_variant === 'on' ? (
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

      <FormButton
        title={'Add Product'}
        onPress={handleUpload}
        loading={submitting}
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

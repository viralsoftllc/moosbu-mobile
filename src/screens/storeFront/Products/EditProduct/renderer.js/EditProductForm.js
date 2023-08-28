import React, {useEffect, useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';

import ImagePicker from '../../../../../shared/components/ImagePicker';
import UseIcon from '../../../../../shared/utils/UseIcon';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {selectCategories} from '../../../../../redux/slices/catalog/selectors';
import TextAreaInput from '../../../../../shared/components/TeaxtAreaInput';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';
import SelectModal from '../../../../../shared/components/SelectModal';

export default function EditProductForm({
  product,
  setProduct,
  coverImgFileResponse,
  handleCoverImageSelection,
  handleDocumentSelection,
  fileResponse,
  limit,
  handleDeleteImage,
  updateProduct,
  submitting,
}) {
  const categories = useSelector(selectCategories);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (!selectedItem && product?.product_categorie) {
      const found = categories?.filter(
        el => el?.name === product?.product_categorie,
      );

      setSelectedItem(found?.[0]);
    }
  }, [selectedItem, product?.product_categorie, categories]);

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.cards}>
          <Pressable style={styles.card} onPress={handleCoverImageSelection}>
            {coverImgFileResponse || product?.is_cover ? (
              <Image
                source={{uri: coverImgFileResponse?.uri || product?.is_cover}}
                style={styles.image}
                resizeMode="contain"
              />
            ) : (
              <>
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name="camera-outline"
                  color={COLORS.borderGray}
                />
                <Text style={styles.cardText}>Add Cover Image</Text>
              </>
            )}
          </Pressable>

          {limit ? (
            <Pressable style={styles.card} onPress={handleDocumentSelection}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="camera-outline"
                color={COLORS.borderGray}
              />
              <Text style={styles.cardText}>
                {fileResponse?.length
                  ? 'Edit product images'
                  : 'Add Product Images'}
              </Text>
            </Pressable>
          ) : null}
        </View>

        <ImagePicker
          images={product?.product_images}
          fileResponse={fileResponse}
          handleDocumentSelection={handleDocumentSelection}
          handleDeleteImage={handleDeleteImage}
        />

        <FormInput
          label={'Product Name'}
          placeholder="Enter product name"
          value={product?.name}
          onChangeText={text => setProduct({...product, name: text})}
        />

        <SelectModalFormInput
          label={'Product Category'}
          placeholder={'Choose Product Category'}
          setShowModal={setShowModal}
          selectedItem={selectedItem}
        />

        <View style={styles.flex}>
          <FormInput
            label={'Product Price'}
            placeholder="Enter product price"
            style={[styles.smallForm, styles.leftFormInput]}
            value={product?.price}
            onChangeText={text => setProduct({...product, price: text})}
            keyboardType="numeric"
          />

          <FormInput
            label={'Product Tax'}
            placeholder="Enter product tax"
            style={[styles.smallForm, styles.rightFormInput]}
            value={product?.product_tax}
            onChangeText={text => setProduct({...product, product_tax: text})}
          />
        </View>

        <View style={styles.flex}>
          <FormInput
            label={'Stock Quantity'}
            placeholder="Enter stock quantity"
            style={[styles.smallForm, styles.leftFormInput]}
            value={product?.quantity?.toString()}
            keyboardType="numeric"
            onChangeText={text => setProduct({...product, quantity: text})}
          />

          <FormInput
            label={'Product SKU'}
            placeholder="Enter product SKU"
            style={[styles.smallForm, styles.rightFormInput]}
            value={product?.SKU}
            onChangeText={text => setProduct({...product, SKU: text})}
          />
        </View>

        <TextAreaInput
          label={'Product Details'}
          placeholder="Enter Product Details"
          value={product?.description}
          onChangeText={text => setProduct({...product, description: text})}
        />

        {/* <Pressable
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
        </Pressable> */}

        {/* {showVariantForm ? (
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
        ) : null} */}
      </View>

      <FormButton
        title={'Update Product'}
        loading={submitting}
        onPress={updateProduct}
      />

      <Modal visible={showModal}>
        <SelectModal
          filteredItems={categories}
          title={'Choose Category'}
          setShowModal={setShowModal}
          selectedItem={selectedItem}
          handleSelect={option => {
            setSelectedItem(option);
            setProduct({...product, product_categorie: option?.name});
            setShowModal(false);
          }}
        />
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingBottom: SIZES.base * 5,
    flex: 1,
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
  cards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
    // borderWidth: 1,
    marginBottom: SIZES.base * 1.5,
  },
  card: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: verticalScale(120),
    borderRadius: SIZES.radius,
    width: '48%',
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    overflow: 'hidden',
  },
  cardText: {
    color: COLORS.borderGray,
    marginTop: SIZES.base / 2,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

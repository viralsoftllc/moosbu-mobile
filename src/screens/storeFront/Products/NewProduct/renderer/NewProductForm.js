import React, {useState} from 'react';
import {Image, Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';
import FormButton from '../../../../../shared/components/FormButton';
import FormInput from '../../../../../shared/components/FormInput';
import ImagePicker from '../../../../../shared/components/ImagePicker';
import {selectCategories} from '../../../../../redux/slices/catalog/selectors';
import TextAreaInput from '../../../../../shared/components/TeaxtAreaInput';
import UseIcon from '../../../../../shared/utils/UseIcon';
import SelectModalFormInput from '../../../../../shared/components/SelectModalFormInput';
import SelectModal from '../../../../../shared/components/SelectModal';

import {Checkbox} from 'react-native-paper';

export default function NewProductForm({
  product,
  setProduct,
  submitting,
  fileResponse,
  coverImgFileResponse,
  handleDocumentSelection,
  handleCoverImageSelection,
  handleUpload,
  handleDeleteImage,
}) {
  const categories = useSelector(selectCategories);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.cards}>
          <Pressable style={styles.card} onPress={handleCoverImageSelection}>
            {coverImgFileResponse ? (
              <Image
                source={{uri: coverImgFileResponse?.uri}}
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
        </View>

        <ImagePicker
          fileResponse={fileResponse}
          handleDocumentSelection={handleDocumentSelection}
          handleDeleteImage={handleDeleteImage}
        />

        <FormInput
          label={'Product Name'}
          placeholder="Enter product name"
          onChangeText={text => setProduct({...product, name: text})}
          value={product?.name || ''}
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

        <TextAreaInput
          label={'Product Description'}
          onChangeText={text => setProduct({...product, description: text})}
          value={product?.description || ''}
          placeholder="Enter Product description"
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <Checkbox
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
            color={COLORS.primary}
          />
          <Text style={{...FONTS.regular, color: COLORS.primary}}>
            Add Product Variants
          </Text>
        </View>

        {checked && (
          <View>
            <FormInput
              label={'Variant Description'}
              placeholder="Enter variant description"
              style={{}}
              onChangeText={text =>
                setProduct({...product, variant_description: text})
              }
              value={product?.variant_description || ''}
            />
            <FormInput
              label={'Product Description'}
              placeholder="Enter product description"
              style={{}}
              onChangeText={text =>
                setProduct({...product, product_description: text})
              }
              value={product?.product_description || ''}
            />
          </View>
        )}
      </View>

      <FormButton
        title={'Add Product'}
        onPress={handleUpload}
        loading={submitting}
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

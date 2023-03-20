import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import EditProductForm from './renderer.js/EditProductForm';

export default function EditProduct() {
  const {setOptions} = useNavigation();
  const {params} = useRoute();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [product, setProduct] = useState({
    SKU: '',
    // created_at: '',
    // created_by: 0,
    description: '',
    // downloadable_prodcut: '',
    enable_product_variant: 'off',
    // id: 13,
    // is_active: 1,
    // is_cover: 'twitter-3-logo-png-transparent_1662209132.png',
    name: '',
    price: '',
    // product_categorie: '4,6,2',
    // product_display: 'on',
    product_tax: '',
    quantity: 0,
    // store_id: 4,
    // updated_at: '2023-03-14T11:27:53.000000Z',
    // variants_json: '{}',
  });

  useEffect(() => {
    setProduct({
      SKU: params?.product?.SKU,
      description: params?.product?.description,
      enable_product_variant: 'off',
      name: params?.product?.name,
      price: String(params?.product?.price),
      product_tax: params?.product?.product_tax,
      quantity: String(params?.product?.quantity),
    });
  }, [params]);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Edit Product'} />,
    });
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <EditProductForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            product={product}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'product update'}
        />
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});

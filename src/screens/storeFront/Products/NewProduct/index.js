import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import client from '../../../../shared/api/client';
import handleApiError from '../../../../shared/components/handleApiError';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import NewProductForm from './renderer/NewProductForm';

export default function NewProduct() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {setOptions} = useNavigation();

  const [product, setProduct] = useState({enable_product_variant: 'off'});
  const [submitting, setSubmitting] = useState(false);

  async function createProduct(images) {
    if (
      !product?.name ||
      !product?.quantity ||
      !product?.price ||
      !product?.product_categorie ||
      !product?.images?.length ||
      !product?.SKU
    ) {
      return notifyMessage('Fill all fields');
    }

    // if (!product?.product_tax) {
    //   return notifyMessage(
    //     'Product tax is required, Create a tax if you do not have any',
    //   );
    // }

    try {
      console.log('Creating product...');
      setSubmitting(true);

      product.multiple_files = images;
      product.is_cover = images?.[0];

      const res = await client.post('/api/product', product);
      console.log('response from creating product...');
      console.log(res);
      console.log(res.data);
      setSubmitting(false);
      handleSuccessfulResponse();
    } catch (error) {
      setSubmitting(false);
      handleApiError(error);
    }
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'New Product'} />,
    });
    return () => {};
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
          <NewProductForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            product={product}
            setProduct={setProduct}
            submitting={submitting}
            setSubmitting={setSubmitting}
            onSubmit={createProduct}
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
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});

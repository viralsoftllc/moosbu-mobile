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

  const [product, setProduct] = useState({});
  const [submitting, setSubmitting] = useState(false);

  async function createProduct() {
    if (!product?.name || !product?.quantity || !product?.price) {
      notifyMessage('Fill all fields');
    }

    try {
      console.log('Creating product...');
      setSubmitting(true);

      const res = await client.post('/api/product', product);
      console.log('response from creating product...');
      console.log(res);
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

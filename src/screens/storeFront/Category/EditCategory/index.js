import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import EditCategoryForm from './renderer.js/EditCategoryForm';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';

export default function EditCategory() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const {setOptions} = useNavigation();
  const {params} = useRoute();

  const [category, setCategory] = useState({name: ''});

  useEffect(() => {
    setCategory({
      name: params?.category?.name,
    });
  }, [params]);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Edit Product'} />,
    });
    return () => {};
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  async function updateCategory() {
    if (!category?.name) {
      return notifyMessage('Please provide category name');
    }

    try {
      setLoading(true);

      await client.put(
        `/api/product_category/${params?.category?.id}`,
        category,
      );
      handleSuccessfulResponse();

      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <EditCategoryForm
            category={category}
            setCategory={setCategory}
            loading={loading}
            onSubmit={updateCategory}
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
  },
  safeAreaView: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});

import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import EditCategoryForm from './renderer.js/EditCategoryForm';

export default function EditCategory() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {setOptions} = useNavigation();
  const {params} = useRoute();

  console.log('Categories');
  console.log(params);

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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <EditCategoryForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            category={category}
            setCategory={setCategory}
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

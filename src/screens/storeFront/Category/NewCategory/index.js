import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import NewCategoryForm from './renderer/NewCategoryForm';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import routes from '../../../../shared/constants/routes';

export default function NewCategory() {
  const {setOptions, navigate} = useNavigation();

  const [details, setDetails] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'New Category'} />,
    });
    return () => {};
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  async function handleCreateCategory() {
    if (!details?.name) {
      return notifyMessage('Please fill all fields');
    }

    try {
      setLoading(true);

      const {data} = await client.post('/api/product_category', details);

      console.log('New category response');
      console.log(data);
      setLoading(false);
      handleSuccessfulResponse();
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
          <NewCategoryForm
            handleSuccessfulResponse={handleSuccessfulResponse}
            setDetails={setDetails}
            details={details}
            loading={loading}
            onSubmit={handleCreateCategory}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Category has been added'}
          subtitle={'Your categories will be updated'}
          onPress={() => {
            setDetails({});
            navigate(routes.PRODUCTS_STACK, {screen: routes.PRODUCTS_TAB});
          }}
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

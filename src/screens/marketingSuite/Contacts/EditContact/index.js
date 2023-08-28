import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';
import EditContactForm from './renderer/EditContactForm';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import client from '../../../../shared/api/client';
import handleApiError from '../../../../shared/components/handleApiError';
import routes from '../../../../shared/constants/routes';

export default function EditContact() {
  const {setOptions, navigate} = useNavigation();
  const {params} = useRoute();
  console.log('params');
  console.log(params);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Edit Contact'} />,
    });
    return () => {};
  }, [setOptions]);

  useEffect(() => {
    setDetails({
      emails: params?.contact?.emails,
      id: params?.contact?.id,
      name: params?.contact?.name,
      number: params?.contact?.number,
      store_id: params?.contact?.store_id,
    });
  }, [params]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  async function handleUpdate() {
    setLoading(true);

    if (!details?.name) {
      setLoading(false);
      return notifyMessage('Name is required');
    }

    if (!details?.number) {
      setLoading(false);
      return notifyMessage('Number is required');
    }

    if (!details?.emails) {
      setLoading(false);
      return notifyMessage('Email is required');
    }

    try {
      const res = await client.put(
        '/api/phonebook/update/' + params?.contact?.id,
        details,
      );
      console.log('Response from edit phonebook');
      console.log(res);
      console.log(res.data);

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
          <EditContactForm
            setDetails={setDetails}
            details={details}
            loading={loading}
            handleUpdate={handleUpdate}
          />
        </ScrollView>
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Contact updated successfully'}
          subtitle={'Your contacts will be updated'}
          onPress={() => {
            navigate(routes.ENGAGEMNT_TAB, {screen: routes.ENGAGEMNT});
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

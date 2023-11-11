import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../../shared/components/UpdateSuccessful';

import NewContactForm from './renderer/NewContactForm';
import notifyMessage from '../../../../shared/hooks/notifyMessage';
import handleApiError from '../../../../shared/components/handleApiError';
import client from '../../../../shared/api/client';
import Loader from '../../../../shared/components/Loader';
import routes from '../../../../shared/constants/routes';
import Test from '../../../Test';

export default function NewContact() {
  const {setOptions, navigate, addListener} = useNavigation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [details, setDetails] = useState({
    name: '',
    numbers: '',
    emails: 'placeholder',
    type: '',
  });
  console.log(details);
  const [loading, setLoading] = useState(false);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [contactsFetchedFromApi, setContactsFetchedFromApi] = useState(false);

  const [contactsPermission, setContactsPermission] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);

  const [number, setNumber] = useState(null);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'New Contact Group'} />,
    });
    return () => {};
  }, [setOptions]);

  function handleSuccessfulResponse() {
    setShowSuccessModal(true);
  }

  async function handleCreate() {
    if (!details?.name) {
      setLoading(false);
      return notifyMessage('Name is required');
    }

    if (!details?.numbers) {
      setLoading(false);
      return notifyMessage('Number is required');
    }

    // if (!details?.emails) {
    //   setLoading(false);
    //   return notifyMessage('Email is required');
    // }

    if (policyChecked === false) {
      return notifyMessage('Privacy policy is required');
    }
    if (contactsPermission === false) {
      return notifyMessage('Contacts permission is required');
    }

    setLoading(true);

    try {
      const res = await client.post('/api/phonebook', details);
      console.log('Response from new phonebook');
      console.log(res);
      console.log(res.data);

      setLoading(false);
      notifyMessage(res.data.message);
      setDetails({name: '', numbers: '', emails: 'placeholder', type: ''});
      setTimeout(handleSuccessfulResponse, 20000);
      // handleSuccessfulResponse();
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  async function fetchContacts(type) {
    setLoadingContacts(true);

    try {
      setLoadingContacts(true);

      console.log('Fetching contact type');
      const {data} = await client.post('/api/get_contact_type', {
        type,
      });
      console.log(data);

      setLoadingContacts(false);
      setContactsFetchedFromApi(true);
      // setItems(data);
      // setFilteredItems(data);
    } catch (error) {
      setLoadingContacts(false);
      handleApiError(error);
    }
  }

  // const getContacts = useCallback(async () => {
  //   try {
  //     setLoading(true);

  //     console.log('Fetching contact type');
  //     const {data} = await client.post('/api/get_contact_type', {
  //       type: 'all',
  //     });
  //     console.log(data);

  //     setLoading(false);
  //     setItems(data);
  //     setFilteredItems(data);
  //   } catch (error) {
  //     setLoading(false);
  //     handleApiError(error);
  //   }
  // }, []);

  // useEffect(() => {
  //   getContacts();
  // }, [getContacts]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {loadingContacts ? (
          <Test />
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flexGrow: 1}}>
            <NewContactForm
              setDetails={setDetails}
              details={details}
              loading={loading}
              handleCreate={handleCreate}
              fetchContacts={fetchContacts}
              contactsFetchedFromApi={contactsFetchedFromApi}
              contactsPermission={contactsPermission}
              setContactsPermission={setContactsPermission}
              policyChecked={policyChecked}
              setPolicyChecked={setPolicyChecked}
            />
          </ScrollView>
        )}
      </View>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Customer have been added to contact'}
          subtitle={'Your contacts will be updated'}
          onPress={() => {
            // navigate();
            navigate(routes.ENGAGEMNT_TAB, {screen: routes.ENGAGEMNT});
          }}
        />
      </Modal>

      {/* <Loader loading={loadingContacts} message={'Fetching contacts'} /> */}
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

import React, {useCallback, useEffect, useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
import Search from '../../../shared/components/Search';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import EditShipping from './EditShipping';
import NewShipping from './NewShipping';
import ShippingCard from './renderer/ShippingCard';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';

export default function Shipping() {
  const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  // const items = [];
  const filteredItems = [];

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSuccessfulResponse() {
    setShowNewForm(false);
    setShowEditForm(false);
    setShowSuccessModal(true);
  }

  // function handleNewItem() {
  //   navigate(routes.NEW_SHIPPING);
  // }

  // function handleEditItem() {
  //   navigate(routes.EDIT_SHIPPING);
  // }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  function handleNewItem() {
    setShowNewForm(true);
  }

  function handleEditItem() {
    setShowEditForm(true);
  }

  const getLocations = useCallback(async () => {
    try {
      console.log('Fetching shippings');
      const {data} = await client.get('/api/shippings');
      console.log(data);
      setItems(data);
    } catch (error) {
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  return (
    <View style={styles.container}>
      <Search
        items={items}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
        filter={false}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <ShippingCard
          title={'Free Shipping'}
          address={'Sabo, Yaba, Laogos Mainland'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
          price={'Free'}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
        />
        <ShippingCard
          title={'Customer Pick-up'}
          address={'Onike-Ikeja, Lagos state'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
          price={1000}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
        />
      </ScrollView>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'shipping'}
        />
      </Modal>

      <Modal visible={showNewForm} animationType="slide" transparent={true}>
        <NewShipping
          setShowNewForm={setShowNewForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showEditForm} animationType="slide" transparent={true}>
        <EditShipping
          setShowEditForm={setShowEditForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'shipping'}
        />
      </Modal>

      <MbotChatWidget />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});

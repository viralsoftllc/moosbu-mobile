import React, {useCallback, useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
import Search from '../../../shared/components/Search';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import EditLocation from './EditLocation';
import NewLocation from './NewLocation';
import LocationCard from './renderer/LocationCard';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import {useEffect} from 'react';

export default function Location() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function handleSuccessfulResponse() {
    setShowNewForm(false);
    setShowSuccessModal(true);
  }
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  // function handleEditItem() {
  //   navigate(routes.EDIT_LOCATION);
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
      console.log('Fetching locations');
      const {data} = await client.get('/api/locations');
      console.log(data);
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
        <LocationCard
          title={'Lagos state, Nigeria'}
          address={'Cover all area in Lagos State.'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
        />

        <LocationCard
          title={'Ikotun, Nigeria'}
          address={'Cover all area in Lagos State.'}
          time={'10:30-12:45 PM'}
          date={'21, Oct 2022'}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
        />
      </ScrollView>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'location'}
        />
      </Modal>

      <MbotChatWidget />

      <Modal visible={showNewForm} animationType="slide" transparent={true}>
        <NewLocation
          setShowNewForm={setShowNewForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal visible={showEditForm} animationType="slide" transparent={true}>
        <EditLocation
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
          title={'location'}
        />
      </Modal>
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

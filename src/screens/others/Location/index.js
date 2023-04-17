import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

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
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import {useDispatch, useSelector} from 'react-redux';
import {setLocations} from '../../../redux/slices/shipping/slice';
import {selectLocations} from '../../../redux/slices/shipping/selectors';

export default function Location() {
  const dispatch = useDispatch();
  const locations = useSelector(selectLocations);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  function handleSuccessfulResponse() {
    setShowNewForm(false);
    setShowSuccessModal(true);
  }
  // const [locations, setLocations] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  // const items = [];
  // const filteredItems = [];

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
    setLoading(true);

    try {
      console.log('Fetching locations');
      const {data} = await client.get('/api/locations');
      console.log(data);

      dispatch(setLocations(data));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getLocations();
  }, [getLocations]);

  async function handleDelete() {
    if (selectedItem?.name) {
      setDeleting(true);

      try {
        console.log('Fetching locations');
        const {data} = await client.delete('/api/location/' + selectedItem?.id);
        console.log(data);

        // dispatch(setLocations(data));
        getLocations();
        setDeleting(false);
        setShowDeleteModal(false);
      } catch (error) {
        setDeleting(false);
        handleApiError(error);
      }
    }
  }

  console.log('selectedItem');
  console.log(selectedItem);

  return (
    <View style={styles.container}>
      <Search
        // items={items}
        // filteredItems={filteredItems}
        handleNewItem={handleNewItem}
        filter={false}
      />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getLocations} />
        }>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !locations?.length ? (
          <EmptyItemInfo message={'No locations to display'} />
        ) : null}

        {locations?.length
          ? locations?.map((location, i) => (
              <LocationCard
                location={location}
                key={i}
                handleEditItem={() => {
                  setSelectedItem(location);
                  handleEditItem();
                }}
                handleDeleteItem={() => {
                  setSelectedItem(location);
                  handleDeleteItem();
                }}
              />
            ))
          : null}
      </ScrollView>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'location'}
          onDelete={handleDelete}
          loading={deleting}
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
          selectedItem={selectedItem}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          title={'location'}
          onPress={getLocations}
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

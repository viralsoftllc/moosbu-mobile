import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import SearchBar from 'react-native-platform-searchbar';
import {useEffect} from 'react';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import EditLocation from './EditLocation';
import NewLocation from './NewLocation';
import LocationCard from './renderer/LocationCard';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import {useDispatch, useSelector} from 'react-redux';
import {setLocations} from '../../../redux/slices/shipping/slice';
import {selectLocations} from '../../../redux/slices/shipping/selectors';
import UseIcon from '../../../shared/utils/UseIcon';

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
  const [response, setResponse] = useState({message: '', subtitle: ''});

  function handleSuccessfulResponse(message, subtitle) {
    setResponse({message, subtitle});
    setShowNewForm(false);
    setShowSuccessModal(true);
  }
  // const [locations, setLocations] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = locations?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(locations);
      setSearchText(text);
    }
  };

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
      setFilteredItems(data);
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

        dispatch(setLocations(data));
        setFilteredItems(data);
        getLocations();
        setDeleting(false);
        setShowDeleteModal(false);
      } catch (error) {
        setDeleting(false);
        handleApiError(error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchBar
            placeholder={'Search locations'}
            value={searchText}
            onChangeText={text => searchFilterFunction(text.trim())}
            onClear={text => searchFilterFunction('')}
            style={styles.search}
            inputStyle={styles.inputStyle}
            platform={'ios'}
            cancelText=""
          />
        </View>

        <Pressable
          style={[styles.iconView, styles.plusIcon]}
          onPress={handleNewItem}>
          <UseIcon type={'AntDesign'} name="plus" color={COLORS.white} />
        </Pressable>
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getLocations} />
        }>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !locations?.length ? (
          <EmptyItemInfo message={'No locations to display'} />
        ) : null}

        {filteredItems?.length
          ? filteredItems?.map((location, i) => (
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

      <Modal visible={showNewForm} animationType="slide" transparent={true}>
        <NewLocation
          setShowNewForm={setShowNewForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Location details successfully added',
              'Your location details is updated now',
            )
          }
        />
      </Modal>

      <Modal visible={showEditForm} animationType="slide" transparent={true}>
        <EditLocation
          setShowEditForm={setShowEditForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Location details updated successfully',
              'Your location details is updated now',
            )
          }
          selectedItem={selectedItem}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={response.message}
          subtitle={response.subtitle}
          onPress={() => {
            setResponse({message: '', subtitle: ''});
            getLocations();
          }}
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
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: SIZES.base,
    marginBottom: SIZES.base * 2,
  },
  iconView: {
    borderWidth: 1,
    borderColor: COLORS.grayText,
    height: verticalScale(32),
    width: verticalScale(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius / 2,
    marginLeft: SIZES.base,
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    height: verticalScale(32),
  },
  plusIcon: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  search: {
    height: verticalScale(32),
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
    overflow: 'hidden',
  },
  searchView: {
    flex: 1,
  },
});

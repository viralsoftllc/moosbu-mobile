import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import SearchBar from 'react-native-platform-searchbar';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import EditShipping from './EditShipping';
import NewShipping from './NewShipping';
import ShippingCard from './renderer/ShippingCard';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Shipping() {
  const [shippings, setShippings] = useState([]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [response, setResponse] = useState({message: '', subtitle: ''});

  const searchFilterFunction = text => {
    if (text) {
      const newdata = shippings?.filter(item => {
        const itemData = item?.location_id
          ? item?.location_id.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(shippings);
      setSearchText(text);
    }
  };

  function handleSuccessfulResponse(message, subtitle) {
    setResponse({message, subtitle});
    setShowNewForm(false);
    setShowEditForm(false);
    setShowSuccessModal(true);
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  function handleNewItem() {
    setShowNewForm(true);
  }

  function handleEditItem(p) {
    console.log('p');
    console.log(p);
    setShowEditForm(true);
  }

  const getShippings = useCallback(async () => {
    setLoading(true);

    try {
      console.log('Fetching shippings...');
      const {data} = await client.get('/api/shippings');
      console.log(data);
      setShippings(data);
      setFilteredItems(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getShippings();
  }, [getShippings]);

  async function handleDelete() {
    if (selectedItem?.id) {
      setDeleting(true);

      try {
        console.log('deleting shipping');
        const {data} = await client.delete('/api/shipping/' + selectedItem?.id);
        console.log(data);

        getShippings();
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
            placeholder={'Search shippings'}
            value={searchText}
            onChangeText={text => searchFilterFunction(text.trim())}
            onClear={text => searchFilterFunction('')}
            style={styles.search}
            inputStyle={styles.inputStyle}
            platform={'ios'}
            cancelText=""
          />
        </View>

        {handleNewItem ? (
          <Pressable
            style={[styles.iconView, styles.plusIcon]}
            onPress={handleNewItem}>
            <UseIcon type={'AntDesign'} name="plus" color={COLORS.white} />
          </Pressable>
        ) : null}
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getShippings} />
        }>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !filteredItems?.length ? (
          <EmptyItemInfo message={'No shippings to display'} />
        ) : null}

        {filteredItems?.length
          ? filteredItems?.map((shipping, i) => (
              <ShippingCard
                key={i}
                shipping={shipping}
                handleEditItem={() => {
                  setSelectedItem(shipping);
                  handleEditItem(shipping);
                }}
                handleDeleteItem={() => {
                  setSelectedItem(shipping);
                  handleDeleteItem();
                }}
              />
            ))
          : null}
      </ScrollView>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'shipping'}
          loading={deleting}
          onDelete={handleDelete}
        />
      </Modal>

      <Modal visible={showNewForm} animationType="slide" transparent={true}>
        <NewShipping
          setShowNewForm={setShowNewForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Shipping details successfully added',
              'Your shipping details is updated now',
            )
          }
        />
      </Modal>

      <Modal visible={showEditForm} animationType="slide" transparent={true}>
        <EditShipping
          setShowEditForm={setShowEditForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Shipping details updated successfully',
              'Your shipping details is updated now',
            )
          }
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
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
            getShippings();
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
    height: verticalScale(40),
    width: verticalScale(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius / 2,
    marginLeft: SIZES.base,
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    height: verticalScale(40),
    marginLeft: 10,
  },
  plusIcon: {
    backgroundColor: COLORS.secondary,
    borderColor: COLORS.secondary,
  },
  search: {
    height: verticalScale(40),
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
    overflow: 'hidden',
  },
  searchView: {
    flex: 1,
  },
});

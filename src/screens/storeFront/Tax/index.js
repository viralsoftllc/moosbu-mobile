import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import SearchBar from 'react-native-platform-searchbar';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import DeleteItem from '../../../shared/components/DeleteItem';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import handleApiError from '../../../shared/components/handleApiError';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import UseIcon from '../../../shared/utils/UseIcon';
import EditTax from './EditTax';
import NewTax from './NewTax';
import TaxCard from './renderer/TaxCard';

export default function Tax() {
  const {setOptions} = useNavigation();
  const [items, setItems] = useState([]);

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = items?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(items);
      setSearchText(text);
    }
  };

  const [showNewTaxForm, setShowNewTaxForm] = useState(false);
  const [showEditTaxForm, setShowEditTaxForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [selectedItem, setSelectedItem] = useState({});
  const [response, setResponse] = useState({message: '', subtitle: ''});

  function handleNewItem() {
    setShowNewTaxForm(true);
  }

  function handleEditItem() {
    setShowEditTaxForm(true);
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  function handleSuccessfulResponse(message, subtitle) {
    setResponse({message, subtitle});
    setShowEditTaxForm(false);
    setShowNewTaxForm(false);
    setShowSuccessModal(true);
  }

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Tax'} />,
    });
  }, [setOptions]);

  const getAllTaxes = useCallback(async () => {
    setLoading(true);

    try {
      console.log('Fetching taxes');
      const {data} = await client.get('/api/taxs');
      console.log(data);
      setLoading(false);

      setItems(data);
      setFilteredItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getAllTaxes();
  }, [getAllTaxes]);

  async function handleDelete() {
    if (selectedItem?.id) {
      setDeleting(true);

      try {
        console.log('Fetching tax');
        const {data} = await client.delete('/api/tax/' + selectedItem?.id);
        console.log(data);

        getAllTaxes();
        setDeleting(false);
        setShowDeleteModal(false);
      } catch (error) {
        setDeleting(false);
        handleApiError(error);
      }
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {/* <Search
          items={items}
          filteredItems={filteredItems}
          handleNewItem={handleNewItem}
        /> */}
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <SearchBar
              placeholder={'Search taxes'}
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
          contentContainerStyle={styles.contentContainerStyle}>
          {loading ? <ActivityIndicator size={'large'} /> : null}

          {filteredItems?.length ? (
            filteredItems.map((item, i) => (
              <TaxCard
                key={i}
                tax={item}
                title={'VAT'}
                subtitle="Value added tax charge on items purchased"
                amount={'7%'}
                icon={
                  <UseIcon
                    name="ticket-percent-outline"
                    type={'MaterialCommunityIcons'}
                    color={COLORS.textPrimary}
                  />
                }
                handleEditItem={() => {
                  setSelectedItem(item);
                  handleEditItem(item);
                }}
                handleDeleteItem={() => {
                  setSelectedItem(item);
                  handleDeleteItem();
                }}
              />
            ))
          ) : !loading ? (
            <EmptyItemInfo message={'No taxes to display'} />
          ) : null}
        </ScrollView>
      </View>

      <Modal visible={showNewTaxForm} animationType="slide" transparent={true}>
        <NewTax
          setShowNewTaxForm={setShowNewTaxForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Tax successfully added',
              'Your taxes will be updated',
            )
          }
        />
      </Modal>

      <Modal visible={showEditTaxForm} animationType="slide" transparent={true}>
        <EditTax
          setShowEditTaxForm={setShowEditTaxForm}
          handleSuccessfulResponse={() =>
            handleSuccessfulResponse(
              'Tax updated successfully',
              'Your taxes will be updated',
            )
          }
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'tax'}
          loading={deleting}
          onDelete={handleDelete}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          onPress={() => {
            setResponse({message: '', subtitle: ''});
            getAllTaxes();
          }}
          message={response.message}
          subtitle={response.subtitle}
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

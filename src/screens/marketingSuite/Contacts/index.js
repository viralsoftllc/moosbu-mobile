import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import routes from '../../../shared/constants/routes';
import ShareItem from '../../storeFront/renderer/ShareItem';
import ContactCard from './renderer/ContactCard';
import client from '../../../shared/api/client';
import handleApiError from '../../../shared/components/handleApiError';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import SearchBar from 'react-native-platform-searchbar';
import UseIcon from '../../../shared/utils/UseIcon';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {setContacts} from '../../../redux/slices/engagement/slice';
import {selectContacts} from '../../../redux/slices/engagement/selectors';
import Test from '../../Test';

export default function Contacts({navigation}) {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const items = useSelector(selectContacts);

  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [items, setItems] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleting, setDeleting] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_CONTACT);
  }

  function handleEditItem(contact) {
    navigate(routes.EDIT_CONTACT, {contact});
  }

  function handleDeleteItem(contact) {
    setSelectedItem(contact);
    setShowDeleteModal(true);
  }

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

  const getContacts = useCallback(async () => {
    try {
      setLoading(true);

      console.log('Fetching contacts');
      const {data} = await client.get('/api/phonebook');
      console.log(data);

      setLoading(false);
      // setItems(data?.data);
      setFilteredItems(data?.data);
      dispatch(setContacts(data?.data));
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getContacts();
  }, [getContacts]);

  async function deletePhonebook() {
    if (!selectedItem) return;

    setDeleting(true);

    try {
      const res = await client.delete('/api/phonebook/' + selectedItem?.id);
      console.log('Delete');
      console.log(res);
      console.log(res.data);

      setDeleting(false);
      getContacts();
      setShowDeleteModal(false);
    } catch (error) {
      setDeleting(false);
      handleApiError(error);
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getContacts();
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />

      {loading ? (
        <Test />
      ) : (
        <>
          <View style={styles.searchContainer}>
            <View style={styles.searchView}>
              <SearchBar
                placeholder={'Search Contact by name'}
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
            contentContainerStyle={{
              paddingBottom: 100,
            }}
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={getContacts} />
            }>
            {loading ? <ActivityIndicator /> : null}

            {!filteredItems?.length ? (
              <EmptyItemInfo message={'Contacts are empty'} />
            ) : null}

            {filteredItems?.map((contact, i) => (
              <ContactCard
                key={i}
                contact={contact}
                setShowShareModal={setShowShareModal}
                handleEditItem={() => handleEditItem(contact)}
                handleDeleteItem={() => handleDeleteItem(contact)}
              />
            ))}
          </ScrollView>

          <Modal
            visible={showShareModal}
            animationType="slide"
            transparent={true}>
            <ShareItem setShowShareModal={setShowShareModal} />
          </Modal>

          <Modal
            visible={showDeleteModal}
            animationType="slide"
            transparent={true}>
            <DeleteItem
              setShowDeleteModal={setShowDeleteModal}
              title={selectedItem?.name}
              onDelete={deletePhonebook}
              loading={deleting}
            />
          </Modal>
        </>
      )}
    </SafeAreaView>
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

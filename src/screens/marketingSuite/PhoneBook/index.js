import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../assets/themes';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShareItem from '../../storeFront/renderer/ShareItem';
import PhoneBookCard from './renderer/PhoneBookCard';

export default function PhoneBook() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_PHONEBOOK);
  }

  function handleEditItem() {
    navigate(routes.EDIT_PHONEBOOK);
  }

  return (
    <View style={styles.container}>
      <Search
        items={items}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
        filter={false}
      />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <PhoneBookCard
          setShowShareModal={setShowShareModal}
          title={'Joshua Moosbu'}
          address={'22 Cresent lane, Surulere Lagos State.'}
          email="Joshuamoosbu@org.ng"
          number="080999998888"
          handleEditItem={handleEditItem}
        />
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} />
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

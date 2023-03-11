import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ItemCard from '../renderer/ItemCard';
import ShareItem from '../renderer/ShareItem';

export default function Products() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_PRODUCT);
  }

  function handleEditItem() {
    navigate(routes.EDIT_PRODUCT);
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  return (
    <View style={styles.container}>
      <Search
        items={items}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
      />

      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <ItemCard
          setShowShareModal={setShowShareModal}
          title={'Single Breasted Suit'}
          subtitle="25 in stock"
          amount={'N5,000,000'}
          handleEditItem={handleEditItem}
          handleDeleteItem={handleDeleteItem}
        />
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} title="product" />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem setShowDeleteModal={setShowDeleteModal} title={'product'} />
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

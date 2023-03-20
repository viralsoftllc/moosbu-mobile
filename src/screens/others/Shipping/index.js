import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import DeleteItem from '../../../shared/components/DeleteItem';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShippingCard from './renderer/ShippingCard';

export default function Shipping() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_SHIPPING);
  }

  function handleEditItem() {
    navigate(routes.EDIT_SHIPPING);
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

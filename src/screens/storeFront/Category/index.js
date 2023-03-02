import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ItemCard from '../renderer/ItemCard';
import ShareItem from '../renderer/ShareItem';

export default function Category() {
  const {navigate} = useNavigation();
  // const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const items = [];
  const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_CATEGORY);
  }

  function handleEditItem() {
    navigate(routes.EDIT_CATEGORY);
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
          title={'Men’s wear'}
          subtitle="1 product listed"
          type="category"
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

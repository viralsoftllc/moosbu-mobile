import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import DeleteItem from '../../../shared/components/DeleteItem';
import handleApiError from '../../../shared/components/handleApiError';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShareItem from '../renderer/ShareItem';
import CategoryCard from './renderer/CategoryCard';

export default function Category() {
  const {navigate} = useNavigation();
  const [items, setItems] = useState(null);
  // const [filteredItems, setFilteredItems] = useState([]);
  const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_CATEGORY);
  }

  function handleEditItem(category) {
    navigate(routes.EDIT_CATEGORY, {category});
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  const getAllCategories = useCallback(async () => {
    setLoading(true);

    try {
      const {data} = await client.get('/api/product_category');
      setLoading(false);

      setItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <View style={styles.container}>
      <Search
        items={items}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {loading ? <ActivityIndicator /> : null}

        {items
          ? Object?.entries(items)?.map((item, i) => (
              <CategoryCard
                category={item}
                title={item[1]}
                key={i}
                setShowShareModal={setShowShareModal}
                handleEditItem={() =>
                  handleEditItem({id: item[0], name: item[1]})
                }
                handleDeleteItem={handleDeleteItem}
              />
            ))
          : null}
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem
          setShowShareModal={setShowShareModal}
          title={'product category'}
        />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem
          setShowDeleteModal={setShowDeleteModal}
          title={'category'}
        />
      </Modal>

      <MbotChatWidget />
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

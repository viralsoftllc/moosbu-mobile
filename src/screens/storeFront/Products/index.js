import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShareItem from '../renderer/ShareItem';
import ProductCard from './renderer/ProductCard';

export default function Products() {
  const {navigate} = useNavigation();
  const [items, setItems] = useState([]);
  // const [filteredItems, setFilteredItems] = useState([]);
  const filteredItems = [];

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_PRODUCT);
  }

  function handleEditItem(product) {
    navigate(routes.EDIT_PRODUCT, {product});
  }

  function handleDeleteItem() {
    setShowDeleteModal(true);
  }

  async function getAllProducts() {
    setLoading(true);
    console.log('Getting products');

    try {
      const {data} = await client.get('/api/products');
      setLoading(false);

      setItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

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

        {items?.length > 0
          ? items?.map((item, i) => (
              <ProductCard
                product={item}
                key={i}
                setShowShareModal={setShowShareModal}
                handleEditItem={() => handleEditItem(item)}
                handleDeleteItem={handleDeleteItem}
              />
            ))
          : null}
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

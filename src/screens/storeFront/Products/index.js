import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import DeleteItem from '../../../shared/components/DeleteItem';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import handleApiError from '../../../shared/components/handleApiError';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShareItem from '../renderer/ShareItem';
import ProductCard from './renderer/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {setProducts} from '../../../redux/slices/catalog/slice';
import {selectProducts} from '../../../redux/slices/catalog/selectors';

export default function Products() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  // const [items, setItems] = useState([]);
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

  const getAllProducts = useCallback(async () => {
    setLoading(true);
    console.log('Getting products');

    try {
      const {data} = await client.get('/api/products');
      console.log(data);
      setLoading(false);

      dispatch(setProducts);
      // setItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  return (
    <View style={styles.container}>
      <Search
        items={products}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAllProducts} />
        }>
        {loading ? <ActivityIndicator /> : null}

        {products?.length > 0 ? (
          products?.map((item, i) => (
            <ProductCard
              product={item}
              key={i}
              setShowShareModal={setShowShareModal}
              handleEditItem={() => handleEditItem(item)}
              handleDeleteItem={handleDeleteItem}
            />
          ))
        ) : !loading ? (
          <EmptyItemInfo message={'No products to display'} />
        ) : null}
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} title="product" />
      </Modal>

      <Modal visible={showDeleteModal} animationType="slide" transparent={true}>
        <DeleteItem setShowDeleteModal={setShowDeleteModal} title={'product'} />
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

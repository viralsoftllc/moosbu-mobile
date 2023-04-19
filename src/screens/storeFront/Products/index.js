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
  // const [filteredItems, setFilteredItems] = useState([]);
  const filteredItems = [];

  // const items = [
  //   {
  //     SKU: 'SC123',
  //     cost: 0,
  //     created_at: '2023-04-18T22:04:32.000000Z',
  //     created_by: 70,
  //     custom_field_1: null,
  //     custom_field_2: null,
  //     custom_field_3: null,
  //     custom_field_4: null,
  //     custom_value_1: null,
  //     custom_value_2: null,
  //     custom_value_3: null,
  //     custom_value_4: null,
  //     description:
  //       'Stripe shirts available in different colors and sizes. Suitable for official outings',
  //     downloadable_prodcut: null,
  //     enable_product_variant: 'off',
  //     id: 168,
  //     is_active: null,
  //     is_cover: 'https://moosbu-os.s3.amazonaws.com/1681561707201',
  //     is_listed: 0,
  //     name: 'Stripe Shirts',
  //     price: 5000,
  //     product_categorie: 'Clothes',
  //     product_display: 'off',
  //     product_images: [[Object], [Object]],
  //     product_tax: null,
  //     quantity: 100,
  //     store_id: 78,
  //     updated_at: '2023-04-18T22:04:32.000000Z',
  //     variants_json: null,
  //   },
  // ];

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

      dispatch(setProducts(data));
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

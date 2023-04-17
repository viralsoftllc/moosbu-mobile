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
import handleApiError from '../../../shared/components/handleApiError';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import ShareItem from '../renderer/ShareItem';
import CategoryCard from './renderer/CategoryCard';
import {useDispatch, useSelector} from 'react-redux';
import {selectCategories} from '../../../redux/slices/catalog/selectors';
import {setCategories} from '../../../redux/slices/catalog/slice';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';

export default function Category() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  // const [filteredItems, setFilteredItems] = useState([]);
  const filteredItems = [];

  const [selectedItem, setSelectedItem] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  function handleNewItem() {
    navigate(routes.NEW_CATEGORY);
  }

  function handleEditItem(category) {
    navigate(routes.EDIT_CATEGORY, {category});
  }

  function handleDeleteItem(param) {
    setShowDeleteModal(true);
    setSelectedItem(param);
  }

  const getAllCategories = useCallback(async () => {
    setLoading(true);

    try {
      const {data} = await client.get('/api/product_category');
      setLoading(false);
      console.log('category');
      console.log(data);

      dispatch(setCategories(data?.data));
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  async function deleteCategory() {
    setDeleting(true);

    try {
      const {data} = await client.delete(
        `/api/product_category/${selectedItem?.id}`,
      );

      console.log('delete response');
      console.log(data);
      setDeleting(false);
      setShowDeleteModal(false);
      getAllCategories();
    } catch (error) {
      setDeleting(false);
      handleApiError(error);
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  return (
    <View style={styles.container}>
      <Search
        items={categories}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
      />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getAllCategories} />
        }>
        {loading ? <ActivityIndicator /> : null}

        {!loading && !categories?.length ? (
          <EmptyItemInfo message={'No categories to display'} />
        ) : null}

        {categories?.map((item, i) => (
          <CategoryCard
            category={item}
            key={i}
            setShowShareModal={setShowShareModal}
            handleEditItem={() => handleEditItem(item)}
            handleDeleteItem={() => handleDeleteItem(item)}
          />
        ))}
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
          onDelete={deleteCategory}
          loading={deleting}
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

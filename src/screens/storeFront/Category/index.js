import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Platform,
} from 'react-native';
import SearchBar from 'react-native-platform-searchbar';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import DeleteItem from '../../../shared/components/DeleteItem';
import handleApiError from '../../../shared/components/handleApiError';
import routes from '../../../shared/constants/routes';
import ShareItem from '../renderer/ShareItem';
import CategoryCard from './renderer/CategoryCard';
import {selectCategories} from '../../../redux/slices/catalog/selectors';
import {setCategories} from '../../../redux/slices/catalog/slice';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Category() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  // const [filteredItems, setFilteredItems] = useState([]);
  // const filteredItems = [];

  const [selectedItem, setSelectedItem] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = categories?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(categories);
      setSearchText(text);
    }
  };

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
      setFilteredItems(data?.data);
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
      {/* <Search
        items={categories}
        filteredItems={filteredItems}
        handleNewItem={handleNewItem}
      /> */}

      <StatusBar backgroundColor={COLORS.primary} />

      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchBar
            placeholder={'Search Categories'}
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
        contentContainerStyle={[
          styles.contentContainerStyle,
          {paddingHorizontal: Platform.OS == 'ios' ? 20 : 0},
        ]}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getAllCategories} />
        }>
        {loading ? <ActivityIndicator /> : null}

        {!loading && !filteredItems?.length ? (
          <EmptyItemInfo message={'No categories to display'} />
        ) : null}

        {filteredItems?.map((item, i) => (
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

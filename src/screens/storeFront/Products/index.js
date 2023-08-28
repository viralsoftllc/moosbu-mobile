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
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from 'react-native-platform-searchbar';
import {verticalScale} from 'react-native-size-matters';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import DeleteItem from '../../../shared/components/DeleteItem';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import handleApiError from '../../../shared/components/handleApiError';
import routes from '../../../shared/constants/routes';
import ShareItem from '../renderer/ShareItem';
import ProductCard from './renderer/ProductCard';
import {setProducts} from '../../../redux/slices/catalog/slice';
import {selectProducts} from '../../../redux/slices/catalog/selectors';
import UseIcon from '../../../shared/utils/UseIcon';

export default function Products() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = products?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(products);
      setSearchText(text);
    }
  };

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
      const res = await client.get('/api/products');
      const {data} = res;
      console.log('products response');
      console.log(res);
      console.log(res.data);
      console.log(res.data?.[0]?.product_images);
      // console.log(data?.filter(el => el?.id === 204)?.[0]);
      // console.log(data?.filter(el => el?.id === 204)?.[0]?.name);
      // console.log('=============================================');
      setLoading(false);

      dispatch(setProducts(data));
      // setItems(data);
      setFilteredItems(data);
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
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <SearchBar
            placeholder={'Search products'}
            value={searchText}
            onChangeText={text => searchFilterFunction(text.trim())}
            onClear={text => searchFilterFunction('')}
            style={styles.search}
            inputStyle={styles.inputStyle}
            platform={'ios'}
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
        contentContainerStyle={styles.contentContainerStyle}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={getAllProducts} />
        }>
        {loading ? <ActivityIndicator /> : null}

        {filteredItems?.length > 0 ? (
          filteredItems?.map((item, i) => (
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

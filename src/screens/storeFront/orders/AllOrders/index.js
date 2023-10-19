import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  StatusBar,
  Text,
} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import SearchBar from 'react-native-platform-searchbar';
import {verticalScale} from 'react-native-size-matters';

import OrderCard from '../renderer/OrderCard';
import client from '../../../../shared/api/client';
import {setOrders} from '../../../../redux/slices/orders/slice';
import handleApiError from '../../../../shared/components/handleApiError';
import {selectOrders} from '../../../../redux/slices/orders/selectors';
import EmptyItemInfo from '../../../../shared/components/EmptyItemInfo';
import {FONTS} from '../../../../assets/themes';
import ScreenHeader from '../../../../shared/components/ScreenHeader';

export default function AllOrders() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  // console.log(orders);

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = orders?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(orders);
      setSearchText(text);
    }
  };

  const getAllOrders = useCallback(async () => {
    try {
      dispatch(setOrders(null));
      setLoading(true);
      const {data} = await client.get('/api/orders');

      dispatch(setOrders(data));
      setFilteredItems(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <View style={styles.container}>
      {/* <Search filter={false} /> */}
      <StatusBar backgroundColor={COLORS.primary} />
      <View style={styles.searchView}>
        <SearchBar
          placeholder={'Search order'}
          value={searchText}
          onChangeText={text => searchFilterFunction(text.trim())}
          onClear={text => searchFilterFunction('')}
          style={styles.search}
          inputStyle={styles.inputStyle}
          platform={'ios'}
          cancelText=""
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !filteredItems?.length ? (
          <EmptyItemInfo message={'Orders are empty'} />
        ) : null}

        {searchText
          ? filteredItems?.map((order, i) => (
              <OrderCard key={i} order={order} />
            ))
          : null}

        {!searchText
          ? orders?.map((order, i) => <OrderCard key={i} order={order} />)
          : null}

        {/* <OrderCard /> */}
      </ScrollView>
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
  searchView: {
    marginBottom: SIZES.base * 2,
  },
  search: {
    height: verticalScale(32),
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
    overflow: 'hidden',
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    height: verticalScale(32),
  },
});

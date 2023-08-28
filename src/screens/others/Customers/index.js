import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import handleApiError from '../../../shared/components/handleApiError';
import routes from '../../../shared/constants/routes';
import CustomerCard from './renderer/CustomerCard';
import {useDispatch, useSelector} from 'react-redux';
import {setCustomers} from '../../../redux/slices/customers/slice';
import {selectCustomers} from '../../../redux/slices/customers/selectors';
import SearchBar from 'react-native-platform-searchbar';
import {verticalScale} from 'react-native-size-matters';

export default function Customers() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const customers = useSelector(selectCustomers);

  const [loading, setLoading] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const searchFilterFunction = text => {
    if (text) {
      const newdata = customers?.filter(item => {
        const itemData = item?.name
          ? item?.name.toLowerCase()
          : ''.toLowerCase();

        const textData = text.toLowerCase();

        return itemData?.indexOf(textData) > -1;
      });

      setFilteredItems(newdata);
      setSearchText(text);
    } else {
      setFilteredItems(customers);
      setSearchText(text);
    }
  };

  const getAllCustomers = useCallback(async () => {
    setLoading(true);
    dispatch(setCustomers(null));

    try {
      // console.log('Fetching customers');
      const {data} = await client.get('/api/customers');
      // console.log(data);
      setLoading(false);

      dispatch(setCustomers(data));
      setFilteredItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  useEffect(() => {
    getAllCustomers();
  }, [getAllCustomers]);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Search
        filter={false}
        handleSearch={searchFilterFunction}
        setSearchText={setSearchText}
        searchText={searchText}
      /> */}

      <View style={styles.searchView}>
        <SearchBar
          placeholder={'Search customer'}
          value={searchText}
          onChangeText={text => searchFilterFunction(text.trim())}
          onClear={text => searchFilterFunction('')}
          style={styles.search}
          inputStyle={styles.inputStyle}
          platform={'ios'}
        />
      </View>

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !customers?.length ? (
          <EmptyItemInfo message={'No customers to display'} />
        ) : null}

        {filteredItems?.length
          ? filteredItems?.map((item, i) => (
              <CustomerCard
                customer={item}
                key={i}
                onPress={() => navigate(routes.CUSTOMER_ORDER)}
              />
            ))
          : null}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingBottom: SIZES.base * 2,
  },
  contentContainerStyle: {
    paddingVertical: SIZES.base * 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  search: {
    height: verticalScale(32),
    borderWidth: 1,
    borderRadius: SIZES.radius / 2,
    borderColor: COLORS.borderGray,
    overflow: 'hidden',
    backgroundColor: COLORS.white,
  },
  searchView: {
    marginHorizontal: SIZES.base,
    marginTop: SIZES.base * 2,
  },
  inputStyle: {
    backgroundColor: COLORS.white,
    height: verticalScale(32),
  },
});

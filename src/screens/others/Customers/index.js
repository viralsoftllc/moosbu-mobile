import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import client from '../../../shared/api/client';
import EmptyItemInfo from '../../../shared/components/EmptyItemInfo';
import handleApiError from '../../../shared/components/handleApiError';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import CustomerCard from './renderer/CustomerCard';

export default function Customers() {
  const {setOptions, navigate} = useNavigation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // const items = [
  //   {
  //     billing_address: 'Badore',
  //     created_at: '2022-06-05T09:15:42.000000Z',
  //     custom_field_title_1: null,
  //     custom_field_title_2: null,
  //     custom_field_title_3: null,
  //     custom_field_title_4: null,
  //     email: 'joshuafirimajnr@gmail.com',
  //     id: 2,
  //     location_id: 0,
  //     name: 'Joshua',
  //     phone: '08104775719',
  //     shipping_address: '-',
  //     shipping_id: 0,
  //     special_instruct: null,
  //     store_id: '4',
  //     updated_at: '2022-06-05T09:15:42.000000Z',
  //   },
  // ];

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Customers'} />,
    });
  }, [setOptions]);

  const getAllCustomers = useCallback(async () => {
    setLoading(true);

    try {
      console.log('Fetching customers');
      const {data} = await client.get('/api/customers');
      console.log(data);
      setLoading(false);

      setItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  const getAllOrders = useCallback(async () => {
    setLoading(true);

    try {
      console.log('Fetching orders');
      const {data} = await client.get('/api/orders');
      console.log(data);
      setLoading(false);

      setItems(data);
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getAllCustomers();
    getAllOrders();
  }, [getAllCustomers, getAllOrders]);

  return (
    <SafeAreaView style={styles.container}>
      <Search filter={false} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !items.length ? (
          <EmptyItemInfo message={'No customers to display'} />
        ) : null}

        {items?.length
          ? items.map((item, i) => (
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
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base * 2,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});

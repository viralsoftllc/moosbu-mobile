import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
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
import Search from '../../../shared/components/Search';
import routes from '../../../shared/constants/routes';
import CustomerCard from './renderer/CustomerCard';
import {useDispatch, useSelector} from 'react-redux';
import {setCustomers} from '../../../redux/slices/customers/slice';
import {selectCustomers} from '../../../redux/slices/customers/selectors';

export default function Customers() {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const customers = useSelector(selectCustomers);

  const [loading, setLoading] = useState(false);

  const getAllCustomers = useCallback(async () => {
    setLoading(true);
    dispatch(setCustomers(null));

    try {
      // console.log('Fetching customers');
      const {data} = await client.get('/api/customers');
      // console.log(data);
      setLoading(false);

      dispatch(setCustomers(data));
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
      <Search filter={false} />

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !customers?.length ? (
          <EmptyItemInfo message={'No customers to display'} />
        ) : null}

        {customers?.length
          ? customers?.map((item, i) => (
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

import React, {useCallback, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';
import Search from '../../../../shared/components/Search';
import OrderCard from '../renderer/OrderCard';
import client from '../../../../shared/api/client';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setOrders} from '../../../../redux/slices/orders/slice';
import handleApiError from '../../../../shared/components/handleApiError';
import {selectOrders} from '../../../../redux/slices/orders/selectors';
import EmptyItemInfo from '../../../../shared/components/EmptyItemInfo';

export default function AllOrders() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  // console.log(orders);

  const getAllOrders = useCallback(async () => {
    try {
      dispatch(setOrders(null));
      setLoading(true);
      const {data} = await client.get('/api/orders');

      dispatch(setOrders(data));
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
      <Search filter={false} />

      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {loading ? <ActivityIndicator size={'large'} /> : null}

        {!loading && !orders?.length ? (
          <EmptyItemInfo message={'Orders are empty'} />
        ) : null}

        {orders?.map((order, i) => (
          <OrderCard key={i} order={order} />
        ))}
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
});

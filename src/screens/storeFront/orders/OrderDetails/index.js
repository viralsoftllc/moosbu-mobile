import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import ScreenHeader from '../../../../shared/components/ScreenHeader';
import Items from './renderer/Items';
import ShippingDetails from './renderer/ShippingDetails';
import BillingAddress from './renderer/BillingAddress';
import OrderSummary from './renderer/OrderSummary';
import {COLORS, SIZES} from '../../../../assets/themes';

export default function OrderDetails() {
  const {params} = useRoute();
  console.log('orders');
  console.log(params?.order);
  console.log(params?.order?.product);
  // console.log(Object.values(JSON.parse(params?.order?.product)?.products));

  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Order Details'} />,
    });
  }, [setOptions]);

  let b = [
    {
      id: 45,
      name: 'Chromo Ring',
      is_cover: 'ezgif-1-7210ddb213_1663161476.jpg',
      stock: 100,
      price: 990000,
      quantity: 1,
      itemTotal: 990000,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {/* {params?.order?.product?.length ? (
          <Items products={params?.order?.product} />
        ) : null} */}

        {/* <Items
          products={Object.values(JSON.parse(params?.order?.product)?.products)}
        /> */}

        <ShippingDetails
          name={params?.order?.name}
          phone={params?.order?.phone}
        />

        <BillingAddress
          name={params?.order?.name}
          phone={params?.order?.phone}
        />

        <OrderSummary
          createdAt={new Date(params?.order?.created_at).toDateString()}
          orderTime={new Date(params?.order?.created_at).toLocaleTimeString()}
          subtotal={params?.order?.price}
          status={params?.order?.status}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
  orderText: {
    color: COLORS.textPrimary,
    fontWeight: 'bold',
  },
  orderNum: {
    color: COLORS.textSecondary,
  },
});

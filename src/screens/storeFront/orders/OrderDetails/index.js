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
  // console.log(params?.order);
  // console.log('Products');
  // console.log(Object.values(JSON.parse(params?.order?.product)?.products));

  // const p = {
  //   products: {
  //     1654851566: {
  //       product_id: '2',
  //       product_name: 'Pasuma Trouser',
  //       image:
  //         'https://moosbu.s3.us-west-1.amazonaws.com/uploads/is_cover_image/default.jpg',
  //       quantity: '5',
  //       price: '15000',
  //       id: '2',
  //       downloadable_prodcut: null,
  //       tax: [{tax_name: 'VAT', tax: '7.5'}],
  //       subtotal: '80625',
  //       originalquantity: '25',
  //       variant_name: 'L',
  //       variant_price: '6000',
  //       variant_qty: '6',
  //       variant_subtotal: '\u20a636,000.00',
  //       originalvariantquantity: '6',
  //       variant_id: '2',
  //     },
  //   },
  // };

  // const o = {
  //   card_exp_month: '',
  //   card_exp_year: '',
  //   card_number: '',
  //   coupon: null,
  //   coupon_json: '""',
  //   created_at: '2022-06-10T09:00:16.000000Z',
  //   created_by: 0,
  //   customer_id: '1',
  //   discount_price: '0.00',
  //   email: 'joshuafirimajnr@gmail.com',
  //   id: 3,
  //   name: 'Jokin',
  //   order_id: '#1654851578',
  //   payer_id: null,
  //   payment_frequency: null,
  //   payment_status: 'approved',
  //   payment_type: 'Whatsapp',
  //   phone: '08104775719',
  //   plan_id: null,
  //   plan_name: null,
  //   price: 32250,
  //   price_currency: 'NGN',
  //   product:
  //     '{"products":{"1654851566":{"product_id":"2","product_name":"Pasuma Trouser","image":"https:\\/\\/moosbu.s3.us-west-1.amazonaws.com\\/uploads\\/is_cover_image\\/default.jpg","quantity":"5","price":"15000","id":"2","downloadable_prodcut":null,"tax":[{"tax_name":"VAT","tax":"7.5"}],"subtotal":"80625","originalquantity":"25","variant_name":"L","variant_price":"6000","variant_qty":"6","variant_subtotal":"\\u20a636,000.00","originalvariantquantity":"6","variant_id":"2"}}}',
  //   product_id: '2',
  //   receipt: '',
  //   shipping_data: '',
  //   status: 'delivered',
  //   subscription_id: null,
  //   txn_id: '',
  //   updated_at: '2022-06-12T07:54:28.000000Z',
  //   user_address_id: '3',
  //   user_id: 4,
  // };

  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Order Details'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <Items
          products={Object.values(JSON.parse(params?.order?.product)?.products)}
        />

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

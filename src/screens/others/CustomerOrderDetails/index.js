import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import {COLORS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import BillingAddress from './renderer/BillingAddress';
import Items from './renderer/Items';
import OrderSummary from './renderer/OrderSummary';
import ShippingDetails from './renderer/ShippingDetails';

export default function CustomerOrderDetails() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Order Details'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.orderText}>
          Order Number <Text style={styles.orderNum}>000824</Text>
        </Text>

        <Items />

        <ShippingDetails />

        <BillingAddress />

        <OrderSummary />
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

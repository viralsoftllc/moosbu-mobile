import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../../assets/themes';
import PaymentCard from '../renderer/PaymentCard';

export default function ManualMethods() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          {/* POS */}
          <PaymentCard
            isActive={false}
            title="P.O.S"
            description={
              'Stripe is a suite of APIs powering online payment and commerce solutions for businesses of all sizes.'
            }
            imageIcon={require('../../../../../assets/icons/pos.png')}
          />

          {/* Bank */}
          <PaymentCard
            isActive={false}
            title="Bank transfer"
            description={
              'PayPal is the faster, safer way to send and receive money or make an online payment.'
            }
            imageIcon={require('../../../../../assets/icons/bank.png')}
          />
        </View>

        <View style={styles.cards}>
          {/* Cash */}
          <PaymentCard
            isActive
            title="Cash"
            description={
              ' Provides a payment infrastructure for global merchants and payment service providers'
            }
            imageIcon={require('../../../../../assets/icons/cash.png')}
          />

          {/* Cash on delivery */}
          <PaymentCard
            isActive
            title="Cash On Delivery"
            description={
              'Offers payment processing services to businesses and was acquired by Irish-American financial company'
            }
            imageIcon={require('../../../../../assets/icons/cashOnDelivery.png')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
  },
  cards: {
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginBottom: SIZES.base,
  },
});

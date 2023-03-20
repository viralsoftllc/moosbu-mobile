import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../../assets/themes';
import PaymentCard from '../renderer/PaymentCard';

export default function AutomatedMethods() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          {/* Stripe */}
          <PaymentCard
            isActive={false}
            title="Stripe"
            description={
              'Stripe is a suite of APIs powering online payment and commerce solutions for businesses of all sizes.'
            }
            imageIcon={require('../../../../../assets/icons/stripe.png')}
          />

          {/* Paypal */}
          <PaymentCard
            isActive={false}
            title="Paypal"
            description={
              'PayPal is the faster, safer way to send and receive money or make an online payment.'
            }
            imageIcon={require('../../../../../assets/icons/paypal.png')}
          />
        </View>

        <View style={styles.cards}>
          {/* Flutterwave */}
          <PaymentCard
            isActive
            title="Flutterwave"
            description={
              ' Provides a payment infrastructure for global merchants and payment service providers'
            }
            imageIcon={require('../../../../../assets/icons/flutterwave.png')}
          />

          {/* Paystack */}
          <PaymentCard
            isActive
            title="Paystack"
            description={
              'Offers payment processing services to businesses and was acquired by Irish-American financial company'
            }
            imageIcon={require('../../../../../assets/icons/paystack.png')}
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

import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../../../assets/themes';
import PaymentCard from '../renderer/PaymentCard';

export default function ThirdPartyLogistics() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          <PaymentCard
            isActive={false}
            title="GEX Logistic"
            description={
              'Reliable logistics services for e-commerce delivery, courier, Warehousing & Fulfilment, Cargo & More.'
            }
            imageIcon={require('../../../../../assets/icons/gex.png')}
          />

          <PaymentCard
            isActive={false}
            title="Airex Logistic"
            description={
              'It is a logistics and material management  distribution service company that caters to express distribution'
            }
            imageIcon={require('../../../../../assets/icons/airex.png')}
          />
        </View>

        <View style={styles.cards}>
          <PaymentCard
            isActive
            title="FOB Logistic"
            description={
              'FOB Global Logistics is a cargo logistics company in Nigeria, designs and operates smart globally integrated supply chains'
            }
            imageIcon={require('../../../../../assets/icons/fob.png')}
          />

          <PaymentCard
            isActive
            title="zippy Logistic"
            description={
              'Offers payment processing services to businesses and was acquired by Irish-American financial company'
            }
            imageIcon={require('../../../../../assets/icons/zippy.png')}
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

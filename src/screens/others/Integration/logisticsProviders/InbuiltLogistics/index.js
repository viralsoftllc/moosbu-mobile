import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../../assets/themes';
import PaymentCard from '../renderer/PaymentCard';

export default function InbuiltLogistics() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.cards}>
          <PaymentCard
            isActive={false}
            title="Gig Logistic"
            description={
              'Leading logistics service provider in Africa, GIGL offers convenient, affordable, express delivery services'
            }
            imageIcon={require('../../../../../assets/icons/gig.png')}
          />

          <PaymentCard
            isActive={false}
            title="Ups Logistic"
            description={
              'UPS® is one of the largest and most trusted Global shipping and logistics companies worldwide'
            }
            imageIcon={require('../../../../../assets/icons/ups.png')}
          />
        </View>

        <View style={styles.cards}>
          <PaymentCard
            isActive
            title="DHL Logistic"
            description={
              'An international logistics company that spread it wings across the border Nigeria and operates well in the country.'
            }
            imageIcon={require('../../../../../assets/icons/dhl.png')}
          />

          <PaymentCard
            isActive
            title="FedEx"
            description={
              'FedEx express shipping is a fast way to send priority shipments that need to be delivered by a certain deadline.'
            }
            imageIcon={require('../../../../../assets/icons/fedex.png')}
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

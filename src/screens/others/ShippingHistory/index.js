import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Modal, ScrollView, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import routes from '../../../shared/constants/routes';
import ShareItem from '../../storeFront/renderer/ShareItem';
import ShippingHistoryCard from './renderer/ShippingHistoryCard';

export default function ShippingHistory() {
  const {navigate} = useNavigation();
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          Track your your shipments and share the details with your customers.
        </Text>

        <ShippingHistoryCard
          title={'Order No: #4546454747464'}
          address={'Shipping to Ajah, Lagos'}
          date={'Shipped on: 21, Oct, 2023'}
          handleViewItem={() => navigate(routes.SHIPPING_DETAILS)}
          handleShareItem={() => setShowShareModal(true)}
        />
        <ShippingHistoryCard
          title={'Order No: #4546454747464'}
          address={'Shipping to Ajah, Lagos'}
          date={'Shipped on: 21, Oct, 2023'}
          handleViewItem={() => navigate(routes.SHIPPING_DETAILS)}
          handleShareItem={() => setShowShareModal(true)}
        />
      </ScrollView>

      <Modal visible={showShareModal} animationType="slide" transparent={true}>
        <ShareItem setShowShareModal={setShowShareModal} title={'shipping'} />
      </Modal>
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
  text: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base * 2,
  },
});

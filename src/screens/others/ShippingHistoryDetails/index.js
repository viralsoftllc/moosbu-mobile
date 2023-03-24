import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ImageIcon from '../../../shared/components/ImageIcon';
import MbotChatWidget from '../../../shared/components/MbotChatWidget';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UseIcon from '../../../shared/utils/UseIcon';

export default function ShippingHistoryDetails() {
  const {setOptions} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'History'} />,
    });
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        {/* Header */}
        <View style={styles.flex}>
          <ImageIcon
            style={styles.imageIcon}
            imageUrl={require('../../../assets/images/menstore.png')}
          />

          <View style={styles.details}>
            <View style={styles.flex}>
              <Text style={styles.title}>Men store</Text>
              <Text style={styles.orderNumber}>Order No: #4546454747464</Text>
            </View>

            <Text style={styles.storeName}>Jooshuamoosbu.store</Text>
            <Text style={styles.status}>Delivered</Text>
          </View>
        </View>

        {/* Items card */}
        <View style={[styles.flex, styles.itemCard]}>
          <ImageIcon
            style={styles.imageIcon}
            imageUrl={require('../../../assets/images/menstore.png')}
          />

          <View style={[styles.flex, styles.details, styles.itemDetails]}>
            <View style={{}}>
              <Text style={styles.cardTitle}>Men blazer </Text>
              <Text style={styles.label}>Quantity: 3</Text>
            </View>

            <View style={{}}>
              <Text style={styles.cardTitle}>N 12,000</Text>
              <Text style={styles.label}>Bank transfer</Text>
            </View>
          </View>
        </View>

        {/* Shipping stage */}
        <View style={[styles.shippingStage, styles.flex]}>
          <View style={styles.leftShippingStage}>
            {/* Tracking number */}
            <View style={[styles.shippingStageRow, styles.flex]}>
              <View style={[styles.shippingLines, styles.firstStage]}>
                <View style={styles.shippingStageDot} />
                <View style={styles.shippingStageLine} />
              </View>

              <View style={styles.details}>
                <Text style={styles.shippingStageLabel}>
                  Tracking number created
                </Text>
                <Text style={styles.shippingStageValue}>
                  Nashvile, TN-Oct, 20. 9:20am
                </Text>
              </View>
            </View>

            {/* In transit */}
            <View style={[styles.shippingStageRow, styles.flex]}>
              <View style={styles.shippingLines}>
                <View style={styles.shippingStageLine} />
                <View style={styles.shippingStageDot} />
                <View style={styles.shippingStageLine} />
              </View>

              <View style={styles.details}>
                <Text style={styles.shippingStageLabel}>In transit</Text>
                <Text style={styles.shippingStageValue}>
                  Nashvile, TN-Oct, 20. 9:20am
                </Text>
              </View>
            </View>

            {/* Out for delivery */}
            <View style={[styles.shippingStageRow, styles.flex]}>
              <View style={styles.shippingLines}>
                <View style={styles.shippingStageLine} />
                <View style={styles.shippingStageDot} />
                <View style={styles.shippingStageLine} />
              </View>

              <View style={styles.details}>
                <Text style={styles.shippingStageLabel}>Out for delivery</Text>
                <Text style={styles.shippingStageValue}>
                  Nashvile, TN-Oct, 20. 9:20am
                </Text>
              </View>
            </View>

            {/* Delivered */}
            <View style={[styles.shippingStageRow, styles.flex]}>
              <View style={[styles.shippingLines, styles.lastStaging]}>
                <View style={styles.shippingStageLine} />
                <View style={styles.shippingStageDot} />
              </View>

              <View style={styles.details}>
                <Text style={styles.shippingStageLabel}>Delivered</Text>
                <Text style={styles.shippingStageValue}>
                  Nashvile, TN-Oct, 20. 9:20am
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.phoneIcon}>
            <UseIcon
              type={'MaterialIcons'}
              name="phone"
              color={COLORS.primary}
            />
          </View>
        </View>

        <View
          style={[
            styles.flex,
            styles.details,
            styles.itemDetails,
            styles.daysRemaining,
          ]}>
          <View>
            <Text style={styles.cardTitle}>3 Days</Text>
            <Text style={styles.label}>Remaining Time</Text>
          </View>

          <View>
            <Text style={styles.cardTitle}>#453756</Text>
            <Text style={styles.label}>Tracking Number</Text>
          </View>
        </View>

        <View style={styles.itemCard}>
          <View>
            <Text style={styles.shippingStageLabel}>Delivery Address</Text>
            <Text style={styles.shippingStageValue}>
              44, Aguda, Surulere, Lagos state, Nigeria.
            </Text>
          </View>

          <View style={[styles.flex, styles.deliveryChannel]}>
            <ImageIcon style={styles.imageIcon} size={verticalScale(30)} />

            <View style={styles.details}>
              <Text style={styles.shippingStageLabel}>Delivery Address</Text>
              <Text style={styles.shippingStageValue}>
                44, Aguda, Surulere, Lagos state, Nigeria.
              </Text>
            </View>

            <View style={styles.deliveryPhoneIcon}>
              <UseIcon
                type={'MaterialIcons'}
                name="phone"
                color={COLORS.primary}
              />
            </View>
          </View>
        </View>

        <MbotChatWidget />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingTop: SIZES.base * 2,
    paddingBottom: SIZES.base * 5,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageIcon: {
    margin: 0,
  },
  details: {
    marginHorizontal: SIZES.base,
    flex: 1,
  },
  title: {
    flex: 1,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  orderNumber: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    fontWeight: '700',
  },
  storeName: {
    marginVertical: SIZES.base / 3,
    color: COLORS.grayText,
  },
  status: {
    color: COLORS.credit,
  },
  itemCard: {
    borderWidth: 1,
    padding: SIZES.base,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    marginTop: SIZES.base * 3,
  },
  itemDetails: {
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
  label: {
    ...FONTS.medium,
    marginTop: SIZES.base / 2,
    color: COLORS.grayText,
  },
  shippingStage: {
    borderWidth: 1,
    borderColor: COLORS.borderGray,
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    marginTop: SIZES.base * 3,
    alignItems: 'flex-end',
  },
  shippingStageValue: {
    ...FONTS.tiny,
    marginTop: SIZES.base / 3,
    color: COLORS.grayText,
  },
  shippingStageLabel: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
    fontWeight: '700',
  },
  leftShippingStage: {
    flex: 1,
  },
  shippingStageRow: {
    // borderWidth: 1,
    // height: verticalScale(58),
  },
  shippingStageDot: {
    width: verticalScale(8),
    height: verticalScale(8),
    backgroundColor: COLORS.credit,
    borderRadius: 100,
  },
  shippingStageLine: {
    width: verticalScale(1),
    height: verticalScale(22),
    backgroundColor: COLORS.credit,
  },
  shippingLines: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SIZES.base,
  },
  firstStage: {
    paddingTop: SIZES.base * 3,
  },
  lastStaging: {
    paddingBottom: SIZES.base * 3,
  },
  phoneIcon: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    height: verticalScale(40),
    width: verticalScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    alignSelf: 'flex-end',
    marginBottom: SIZES.base,
  },
  deliveryPhoneIcon: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    height: verticalScale(30),
    width: verticalScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  daysRemaining: {
    marginTop: SIZES.base * 4,
  },
  deliveryChannel: {
    marginTop: SIZES.base * 2,
  },
});

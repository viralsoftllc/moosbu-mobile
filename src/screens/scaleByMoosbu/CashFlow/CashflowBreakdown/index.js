import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import FormButton from '../../../../shared/components/FormButton';

import ScreenHeader from '../../../../shared/components/ScreenHeader';
import routes from '../../../../shared/constants/routes';
import UseIcon from '../../../../shared/utils/UseIcon';

const ratings = [
  {title: 'Repayment date', subtitle: '30 days'},
  {title: 'Cash flow advance percentage', subtitle: '12.90% interest'},
  {title: 'Interest amount', subtitle: '₦451.50'},
  {title: 'Admin fees', subtitle: '₦150.00'},
];

export default function CashflowBreakdown() {
  const {setOptions, navigate} = useNavigation();

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Cash Flow Advance Breakdown '} />,
    });

    return () => {};
  }, [setOptions]);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.card}>
          <View style={styles.iconView}>
            <UseIcon
              type={'MaterialIcons'}
              name="credit-card"
              color={COLORS.secondary}
            />
          </View>

          <View style={styles.details}>
            <Text style={styles.title}>
              You are applying for Cash Flow Advance
            </Text>
            <Text style={styles.subtitle}>
              Below is the amount you are applying for
            </Text>
            <Text style={styles.amount}>₦30,000.00</Text>
          </View>
        </View>

        <Text style={styles.text}>
          All cash flow advance must be repaid in{' '}
          <Text style={styles.days}>30 days</Text>. It will take a maximum of 24
          hours to review and approve your cash flow advance request. Interest
          and admin fee will be deducted immediately
        </Text>

        <Text style={styles.info}>Cash Flow Advance Information</Text>

        {ratings?.map((rating, i) => (
          <View style={styles.rating} key={i}>
            <View style={styles.ratingIcon}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="calendar-blank-outline"
                color={'rgb(118, 163, 224)'}
              />
            </View>

            <View>
              <Text style={styles.ratingTitle}>{rating.title}</Text>
              <Text style={styles.ratingSubtitle}>{rating.subtitle}</Text>
            </View>
          </View>
        ))}

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Amount you are applying for</Text>
            <Text style={styles.summaryValue}>30,000</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Interest and admin fee</Text>
            <Text style={styles.summaryValue}>N601.50</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>What you will be credited</Text>
            <Text style={styles.summaryValue}>N28,980.50</Text>
          </View>
        </View>

        <FormButton
          title={'Accept & Continue'}
          onPress={() => navigate(routes.CASHFLOW_REASON)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingBottom: SIZES.base,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 5,
  },
  card: {
    borderWidth: 1,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: COLORS.borderGray,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 2,
    marginVertical: SIZES.base * 2,
  },
  iconView: {
    alignSelf: 'center',
    height: verticalScale(40),
    width: verticalScale(40),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
  },
  details: {
    marginLeft: SIZES.base,
  },
  title: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    marginBottom: SIZES.base / 2,
  },
  subtitle: {
    marginBottom: SIZES.base * 2,
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  amount: {
    ...FONTS.h4,
    color: COLORS.textPrimary,
  },
  text: {
    textAlign: 'center',
    color: COLORS.grayText,
    ...FONTS.regular,
    marginBottom: SIZES.base * 4,
  },
  days: {
    color: COLORS.secondary,
  },
  info: {
    color: COLORS.grayText,
    ...FONTS.medium,
    marginBottom: SIZES.base * 3,
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingBottom: SIZES.base * 1.5,
    borderColor: COLORS.borderGray,
    marginBottom: SIZES.base * 2,
  },
  ratingIcon: {
    padding: SIZES.base * 1.4,
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    borderRadius: 100,
    marginRight: SIZES.base * 1.5,
  },
  ratingTitle: {
    color: COLORS.textPrimary,
    ...FONTS.regular,
    marginBottom: SIZES.base,
  },
  ratingSubtitle: {
    color: COLORS.grayText,
    ...FONTS.medium,
  },
  summaryRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: SIZES.base * 1.5,
  },
  summaryLabel: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
  },
  summaryValue: {
    color: COLORS.textPrimary,
    ...FONTS.h6,
  },
  summary: {
    marginBottom: SIZES.base * 5,
  },
});

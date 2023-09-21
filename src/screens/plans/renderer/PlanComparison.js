import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';

import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import {scale, verticalScale} from 'react-native-size-matters';
import UseIcon from '../../../shared/utils/UseIcon';

const plans = [
  {
    label: 'Payment Processing',
    freePlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
    paidPlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
  },
  {label: 'Inventory Management', freePlan: 'Limited', paidPlan: 'Unlimited'},
  {label: 'Stores', freePlan: '1', paidPlan: '10'},
  {
    label: 'Businnes Analytics',
    freePlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
    paidPlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
  },
  {
    label: 'Marketing Campaigns',
    freePlan: '100 Credits',
    paidPlan: '1,000 Credits',
  },
  {
    label: 'Personalised AI powered assistant',
    freePlan: '100',
    paidPlan: 'Unlimited',
  },
  {label: 'Ai Sales Writer', freePlan: '100', paidPlan: 'Unlimited'},
  {label: 'Discount & Coupons', freePlan: '10', paidPlan: 'Unlimited'},
  {
    label: 'Custom Domain',
    freePlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="close-circle-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
    paidPlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
  },
  {
    label: 'Staff Login',
    freePlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="close-circle-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
    paidPlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
  },
  {
    label: 'Growth Settings',
    freePlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="close-circle-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
    paidPlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
  },
  {
    label: 'Third Party Integrations',
    freePlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="close-circle-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
    paidPlan: (
      <UseIcon
        type={'MaterialCommunityIcons'}
        name="checkbox-marked-outline"
        size={scale(17)}
        color={COLORS.textPrimary}
      />
    ),
  },
];

export default function PlanComparison({toggleComparisonModal}) {
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScreenHeader onPress={toggleComparisonModal} />

      <View style={styles.container}>
        <View style={styles.pageHeaderView}>
          <Text style={styles.pageHeader}>Compare plan</Text>

          <Text style={styles.pageSubheader}>
            Compare plans and choose the package option that suits you
          </Text>
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}>
          <View style={styles.table}>
            <View style={[styles.row, styles.rowHeaderView]}>
              <View style={styles.feature}>
                <Text style={styles.header}>Features</Text>
              </View>

              <View style={styles.plan}>
                <Text style={styles.header}>Free Plan</Text>
              </View>

              <View style={styles.plan}>
                <Text style={styles.header}>Paid plan</Text>
              </View>
            </View>

            {plans?.map((plan, i) => (
              <View style={[styles.row]} key={i}>
                <View style={styles.featureValue}>
                  <Text style={styles.cellText}>{plan.label}</Text>
                </View>

                <View style={styles.plan}>
                  <Text style={styles.cellText}>{plan?.freePlan}</Text>
                </View>

                <View style={styles.plan}>
                  <Text style={styles.cellText}>{plan?.paidPlan}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: SIZES.base / 2,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  contentContainerStyle: {
    flexGrow: 1,
    backgroundColor: COLORS.white,
    paddingBottom: SIZES.base * 5,
  },
  pageHeaderView: {
    marginBottom: SIZES.base * 3,
  },
  pageHeader: {
    ...FONTS.h5,
    // fontWeight: '600',
    marginBottom: SIZES.base / 5,
    color: COLORS.textPrimary,
  },
  pageSubheader: {
    ...FONTS.medium,
    fontWeight: '400',
    color: COLORS.textGray,
  },
  table: {
    borderTopWidth: 1,
    borderColor: COLORS.borderGray,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
    height: verticalScale(45),
  },
  feature: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowHeaderView: {
    backgroundColor: COLORS.tabBg,
    height: verticalScale(50),
  },
  plan: {
    paddingHorizontal: SIZES.base / 2,
    minWidth: '25%',
    borderLeftWidth: 1,
    borderColor: COLORS.borderGray,
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    ...FONTS.h5,
    fontWeight: 'bold',
  },
  featureValue: {
    flex: 1,
  },
  cellText: {
    ...FONTS.medium,
    color: COLORS.textPrimary,
  },
});

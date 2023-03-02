import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';
import BusinessOverviewCard from './BusinessOverviewCard';

export default function BusinessOverview() {
  return (
    <View>
      <View style={styles.businessOverviewHeader}>
        <Text style={styles.sectionTitle}>Business Overview</Text>

        <View style={styles.businessOverviewPeriod}>
          <Text style={styles.businessOverviewPeriodText}>This week</Text>
          <UseIcon type={'MaterialIcons'} name="keyboard-arrow-down" />
        </View>
      </View>

      {/* Cards */}
      <View style={styles.businessOverviewCards}>
        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'Fontisto'}
              name="person"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Customers"
          amount={'1,439'}
          percent={9}
          backgroundColor="#E4F4F1"
        />

        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'Feather'}
              name="box"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Products"
          amount={'1,547'}
          percent={36}
          backgroundColor="#F5F1DA"
        />

        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'SimpleLineIcons'}
              name="handbag"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Order"
          amount={'1,730'}
          percent={29}
          backgroundColor="#EEF1F6"
        />
      </View>

      <View style={styles.businessOverviewCards}>
        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'Ionicons'}
              name="people-outline"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Store visit"
          amount={'1,438'}
          percent={13}
          backgroundColor="#ECECFF"
        />

        <BusinessOverviewCard
          icon={
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="chart-timeline-variant"
              size={14}
              color={COLORS.black}
            />
          }
          label="Total Conversion"
          amount={'939'}
          percent={14}
          backgroundColor="#E2E2E2"
        />

        <View style={styles.emptyView} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  businessOverviewCards: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 1.5,
  },
  businessOverviewHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 1.5,
  },
  businessOverviewPeriod: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  businessOverviewPeriodText: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    fontWeight: '200',
    marginRight: SIZES.base / 5,
  },
  emptyView: {width: '31%'},
  sectionTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
  },
});

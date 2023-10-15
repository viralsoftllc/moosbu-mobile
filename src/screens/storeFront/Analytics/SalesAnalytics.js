import React from 'react';
import {ScrollView, StatusBar, Platform, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import Chart from './renderers/Chart';
import Filters from './renderers/Filters';
import OverviewCard from './renderers/OverviewCard';
import OverviewHeader from './renderers/OverviewHeader';

const filters = [
  {label: 'Total sale'},
  {label: 'Gross profit'},
  {label: 'Shipping speed'},
  {label: 'offline sales'},
  {label: 'New sales'},
  {label: 'New customers'},
  {label: 'Online payment'},
  {label: 'Offline payment'},
  {label: 'Conversion rate on store'},
  {label: 'Total customers'},
];

export default function SalesAnalytics() {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.contentContainerStyle,
          {paddingHorizontal: Platform.OS == 'ios' ? 20 : 0},
        ]}>
        <OverviewHeader />
        <OverviewCard label={'Total sales'} amount="N3,000,000" percent="20%" />

        <Chart />

        <Filters data={filters} />
      </ScrollView>
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
});

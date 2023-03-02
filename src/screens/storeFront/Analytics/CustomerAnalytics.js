import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import {COLORS, SIZES} from '../../../assets/themes';
import Chart from './renderers/Chart';
import Filters from './renderers/Filters';
import OverviewCard from './renderers/OverviewCard';
import OverviewHeader from './renderers/OverviewHeader';

const filters = [
  {label: 'Total customers'},
  {label: 'New customers'},
  {label: 'Returning customers'},
  {label: 'Average spend per customer'},
  {label: 'Top customer by number of order'},
  {label: 'Top customers by volume'},
];

export default function CustomerAnalytics() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <OverviewHeader />
        <OverviewCard
          label={'Total customers'}
          amount="N3,000,000"
          percent="20%"
        />

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

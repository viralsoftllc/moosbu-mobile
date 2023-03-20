import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../assets/themes';
import Chart from './renderers/Chart';
import Filters from './renderers/Filters';
import OverviewCard from './renderers/OverviewCard';
import OverviewHeader from './renderers/OverviewHeader';

const filters = [
  {label: 'Product sold'},
  {label: 'Most sold products'},
  {label: 'Top 5 products bt amount sold'},
  {label: 'Least sold product'},
  {label: 'New products added'},
  {label: 'Top 5 products by unit sold'},
  {label: 'Least 5 products sold buy unit and amount'},
];

export default function ProductAnalytics() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <OverviewHeader />
        <OverviewCard
          label={'Total product sold'}
          amount="3,000"
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

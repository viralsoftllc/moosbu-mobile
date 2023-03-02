import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../../../assets/themes';

import CreditScoreDetailsLink from '../renderer/CreditScoreDetailsLink';

export default function LoanHistory() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <CreditScoreDetailsLink />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: SIZES.base,
    backgroundColor: COLORS.white,
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: SIZES.base * 2,
  },
});

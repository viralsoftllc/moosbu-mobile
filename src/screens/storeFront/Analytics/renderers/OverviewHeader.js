import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function OverviewHeader() {
  return (
    <View style={styles.overviewHeader}>
      <Text style={styles.sectionTitle}>Overview</Text>

      <View style={styles.overviewPeriod}>
        <Text style={styles.overviewPeriodText}>This week</Text>
        <UseIcon type={'MaterialIcons'} name="keyboard-arrow-down" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  overviewHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: SIZES.base * 1.5,
  },
  overviewPeriod: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewPeriodText: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
    fontWeight: '200',
    marginRight: SIZES.base / 5,
  },
  sectionTitle: {
    ...FONTS.h5,
    color: COLORS.textPrimary,
  },
});

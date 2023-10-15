import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import ComingSoon from '../../../shared/components/ComingSoon';
import {COLORS} from '../../../assets/themes';
export default function Automation() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />

      <ComingSoon
        page={'automation'}
        iconType={'MaterialCommunityIcons'}
        iconName={'chart-timeline-variant'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

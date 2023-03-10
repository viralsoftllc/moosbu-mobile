import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import ComingSoon from '../../../shared/components/ComingSoon';

export default function Automation() {
  return (
    <SafeAreaView style={styles.container}>
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

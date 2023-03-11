import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';
export default function Integration() {
  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'integration'}
        iconType={'MaterialCommunityIcons'}
        iconName={'integrated-circuit-chip'}
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

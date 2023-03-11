import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';
export default function Support() {
  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'support'}
        iconType={'MaterialCommunityIcons'}
        iconName={'face-agent'}
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

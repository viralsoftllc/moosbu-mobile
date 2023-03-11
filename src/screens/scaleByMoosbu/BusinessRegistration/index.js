import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';

export default function BussinessRegistration() {
  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'business registration'}
        iconType={'SimpleLineIcons'}
        iconName={'briefcase'}
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

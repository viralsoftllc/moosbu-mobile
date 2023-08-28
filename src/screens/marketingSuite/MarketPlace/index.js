import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';

export default function MarketPlace() {
  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'marketplace'}
        iconType={'MaterialCommunityIcons'}
        iconName={'shopping-outline'}
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

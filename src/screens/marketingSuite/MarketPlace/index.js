import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';
import {COLORS} from '../../../assets/themes';

export default function MarketPlace() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} />
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

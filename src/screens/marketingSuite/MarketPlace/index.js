import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, Platform} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';
import {COLORS} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';

export default function MarketPlace() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader />
      <StatusBar backgroundColor={COLORS.primary} barStyle={'default'} />

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

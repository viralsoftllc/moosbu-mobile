import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar, View} from 'react-native';

import ComingSoon from '../../../shared/components/ComingSoon';
import {COLORS} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
export default function Automation() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScreenHeader title={'Automation'} />
      <StatusBar backgroundColor={COLORS.primary} barStyle={'default'} />

      <View style={styles.container}>
        <ComingSoon
          page={'automation'}
          iconType={'MaterialCommunityIcons'}
          iconName={'chart-timeline-variant'}
        />
      </View>
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

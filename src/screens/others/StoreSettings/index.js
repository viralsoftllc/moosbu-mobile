import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';
export default function StoreSettings() {
  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'store settings'}
        iconType={'MaterialCommunityIcons'}
        iconName={'cog-outline'}
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

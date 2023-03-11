import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import ComingSoon from '../../../shared/components/ComingSoon';

export default function PublicListing() {
  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'public listing'}
        iconType={'MaterialCommunityIcons'}
        iconName={'file-cabinet'}
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

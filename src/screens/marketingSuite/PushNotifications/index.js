import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import ComingSoon from '../../../shared/components/ComingSoon';

export default function PushNotifications() {
  return (
    <SafeAreaView style={styles.container}>
      <ComingSoon
        page={'Push Notifications'}
        iconType={'EntypoIcon'}
        iconName={'notification'}
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

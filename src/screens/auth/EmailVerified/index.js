import {StyleSheet, Text, View, Pressable, SafeAreaView} from 'react-native';
import React from 'react';

import {COLORS, SIZES, FONTS} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

const EmailVerified = () => {
  return (
    <SafeAreaView>
      <Text style={styles.headerText}>Verify Email</Text>
    </SafeAreaView>
  );
};

export default EmailVerified;

const styles = StyleSheet.create({
  headerText: {
    textAlign: 'center',
    color: COLORS.primary,
    ...FONTS.h4,
    marginTop: SIZES.base * 1.5,
    marginBottom: SIZES.base,
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SIZES} from '../../assets/themes';

export default function EmptyItemInfo({message}) {
  return (
    <View style={styles.container}>
      <Text>{message}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.base * 2,
  },
});

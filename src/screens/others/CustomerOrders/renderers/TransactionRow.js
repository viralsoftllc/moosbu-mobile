import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {COLORS, FONTS, SIZES} from '../../../../assets/themes';

export default function TransactionRow({transaction, onPress}) {
  function getColor() {
    if (transaction?.status?.toLowerCase() === 'completed') {
      return COLORS.credit;
    }
    if (transaction?.status?.toLowerCase() === 'pending') {
      return COLORS.pending;
    }
    if (transaction?.status?.toLowerCase() === 'cancelled') {
      return COLORS.debit;
    }
    // if (transaction?.status?.toLowerCase() === 'sent') {
    //   return COLORS.debit;
    // }
  }

  return (
    <Pressable style={[styles.container]} onPress={onPress}>
      <View style={styles.flex}>
        <View>
          <Text style={styles.text}>{transaction?.id}</Text>
        </View>

        <View>
          <Text style={styles.text}>{transaction?.name}</Text>
        </View>

        <View>
          <Text style={[styles.text, {color: getColor()}]}>
            {transaction?.status}
          </Text>
        </View>

        <View>
          <Text style={styles.text}>{transaction?.payment}</Text>
        </View>

        <View>
          <Text style={[styles.text, {color: getColor()}]}>
            {transaction?.amount}
          </Text>
        </View>
      </View>

      <Text style={styles.date}>12, June 2023-2:12:08</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
  },
  date: {
    color: COLORS.textGray,
    ...FONTS.tiny,
    fontWeight: '400',
    marginTop: SIZES.base / 5,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    fontWeight: '500',
  },
});

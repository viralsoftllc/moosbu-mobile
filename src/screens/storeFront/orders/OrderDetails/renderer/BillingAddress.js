import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';

export default function BillingAddress({name, phone}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Billing Address</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Name</Text>
        <Text style={styles.rowText}>{name || ''}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Phone</Text>
        <Text style={styles.rowText}>{phone || ''}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Shipping Address</Text>
        <Text style={styles.rowText}>Walinton street Ikeja, Lagos.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: SIZES.radius,
    overflow: 'hidden',
    borderColor: COLORS.borderGray,
    marginVertical: SIZES.base * 1.5,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.base,
    borderBottomWidth: 1,
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
  },
  rowText: {
    color: COLORS.textPrimary,
    flex: 1,
    ...FONTS.medium,
  },
  header: {
    padding: SIZES.base,
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderBottomColor: COLORS.borderGray,
  },
  headerText: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
});

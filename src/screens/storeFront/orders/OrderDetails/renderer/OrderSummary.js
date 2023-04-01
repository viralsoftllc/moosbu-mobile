import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';

export default function OrderSummary({
  createdAt,
  orderTime,
  subtotal,
  deliveryFee,
  status,
}) {
  function getStatus() {
    if (!status) {
      return '';
    }

    return status?.toLowerCase() === 'delivered' ? 'Completed' : 'Pending';
  }

  return (
    <View style={styles.container}>
      <View style={[styles.header]}>
        <Text style={styles.headerText}>Order Summary</Text>
        <Text style={[styles.headerText, styles.orderStatus]}>
          {getStatus()}
        </Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Created At</Text>
        <Text style={styles.rowText}>{createdAt || ''}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Order Time</Text>
        <Text style={styles.rowText}>{orderTime || ''}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Subtotal</Text>
        <Text style={styles.rowText}>{subtotal || ''}</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Delivery Fee</Text>
        <Text style={styles.rowText}>
          {deliveryFee ? `₦${deliveryFee}` : 'Free'}
        </Text>
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
  },
  header: {
    padding: SIZES.base,
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderBottomColor: COLORS.borderGray,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
  orderStatus: {
    color: COLORS.credit,
  },
});

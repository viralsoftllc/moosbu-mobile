import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';

export default function Items({products}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Item Summary</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.rowText}>Item Name</Text>
        <Text style={styles.rowText}>Unit</Text>
        <Text style={styles.rowText}>Price</Text>
        <Text style={styles.rowText}>Total Price</Text>
      </View>

      {products?.map((product, i) => (
        <View style={styles.row} key={i}>
          <Text style={styles.rowText}>{product?.product_name || ''}</Text>
          <Text style={styles.rowText}>
            {product?.quantity ? `${product?.quantity}x` : ''}
          </Text>
          <Text style={styles.rowText}>₦{product?.price || ''}</Text>
          <Text style={styles.rowText}>₦{product?.subtotal || ''}</Text>
        </View>
      ))}
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
  header: {
    padding: SIZES.base,
    borderBottomWidth: 1,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderBottomColor: COLORS.borderGray,
  },
  rowText: {
    color: COLORS.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  headerText: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
});

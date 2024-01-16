import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../../../../assets/themes';

export default function Items({products}) {
  const productElements = [];

  console.log(products.length);
  // console.log(JSON.parse(products).length);

  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    productElements.push(
      <View style={styles.row} key={i}>
        <Text style={styles.rowText}>{product?.product_name || ''}</Text>
        <Text style={styles.rowText}>
          {product?.quantity ? `${product?.quantity}x` : ''}
        </Text>
        <Text style={styles.rowText}>₦{product?.price || ''}</Text>
        <Text style={styles.rowText}>₦{product?.subtotal || ''}</Text>
      </View>,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Item Summary</Text>
      </View>

      <View style={styles.row}>
        <Text style={[styles.rowText, {fontFamily: 'Lato-Bold'}]}>
          Item Name
        </Text>
        <Text style={[styles.rowText, {fontFamily: 'Lato-Bold'}]}>Unit</Text>
        <Text style={[styles.rowText, {fontFamily: 'Lato-Bold'}]}>Price</Text>
        <Text style={[styles.rowText, {fontFamily: 'Lato-Bold'}]}>
          Total Price
        </Text>
      </View>

      {JSON.parse(products)?.map((product, i) => (
        <View style={styles.row} key={i}>
          <Text style={styles.rowText}>{product?.name || ''}</Text>
          <Text style={styles.rowText}>
            {product?.quantity ? `${product?.quantity}x` : ''}
          </Text>
          <Text style={styles.rowText}>
            {Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(product?.price) || ''}
          </Text>
          <Text style={styles.rowText}>
            {Intl.NumberFormat('en-NG', {
              style: 'currency',
              currency: 'NGN',
            }).format(product?.price * product?.quantity) || ''}
          </Text>
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
    ...FONTS.medium,
  },
  headerText: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function StoreRevenue() {
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <UseIcon
          type={'Fontisto'}
          name="shopping-store"
          size={verticalScale(11)}
          color={COLORS.primary}
        />

        <Text style={styles.title}>Store Revenue</Text>
      </View>

      <Text style={styles.description}>Your store revenue is:</Text>

      <View style={styles.amountView}>
        <Text style={styles.amount}>N3,000,000</Text>

        <View style={styles.percentView}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-drop-up"
            size={23}
            color={COLORS.secondary}
            style={styles.percentIcon}
          />

          <Text style={styles.percentText}>20%</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  amount: {
    color: COLORS.textPrimary,
    ...FONTS.h4,
    marginRight: SIZES.base / 2,
  },
  amountView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    width: '48%',
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 2,
    borderRadius: SIZES.radius,
    backgroundColor: '#EEEFF9',
    height: verticalScale(120),
  },
  description: {
    ...FONTS.small,
    color: COLORS.black,
    fontWeight: '100',
    marginTop: SIZES.base * 2,
    marginBottom: SIZES.base,
  },
  percentIcon: {
    position: 'absolute',
    top: -7,
    left: 0,
    right: 0,
  },
  percentText: {
    margin: 0,
    padding: 0,
    ...FONTS.tiny,
    position: 'absolute',
    bottom: 5,
    left: 0,
    right: 0,
    color: COLORS.textSecondary,
  },
  percentView: {
    position: 'relative',
    minHeight: 30,
    width: 30,
  },
  title: {
    ...FONTS.regular,
    marginLeft: SIZES.base / 1.5,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

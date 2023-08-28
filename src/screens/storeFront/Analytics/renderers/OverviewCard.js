import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../../assets/themes';
import UseIcon from '../../../../shared/utils/UseIcon';

export default function OverviewCard({label, amount, percent}) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.amountView}>
        <Text style={styles.amount}>{amount}</Text>

        <View style={styles.percentView}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-drop-up"
            size={23}
            color={COLORS.credit}
            style={styles.percentIcon}
          />

          <Text style={styles.percentText}>{percent}</Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  amount: {
    color: COLORS.white,
    ...FONTS.h5,
    marginRight: SIZES.base / 2,
  },
  amountView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    backgroundColor: COLORS.primaryBackground,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 1.5,
    width: verticalScale(135),
  },
  label: {
    ...FONTS.medium,
    color: COLORS.white,
    fontWeight: '100',
    marginBottom: SIZES.base / 2,
  },
  percentIcon: {
    position: 'absolute',
    top: -5,
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
    color: COLORS.credit,
  },
  percentView: {
    position: 'relative',
    minHeight: 30,
    width: 30,
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
// import UseIcon from '../../../shared/utils/UseIcon';

export default function BusinessOverviewCard({
  icon,
  label,
  amount,
  percent,
  backgroundColor,
}) {
  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.iconView}>{icon}</View>

      <Text style={styles.description}>{label}</Text>

      <View style={styles.amountView}>
        <Text style={styles.amount}>{amount || 0}</Text>

        {/* <View style={styles.percentView}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-drop-up"
            size={20}
            color={COLORS.secondary}
            style={styles.percentIcon}
          />

          <Text style={styles.percentText}>{percent}</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: COLORS.black,
    ...FONTS.h5,
    marginRight: SIZES.base / 2,
    textAlign: 'center',
    width: '100%',
  },
  amountView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    width: '31%',
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base / 2,
    borderRadius: SIZES.radius / 2,
    minHeight: verticalScale(100),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // label: {
  //   ...FONTS.tiny,
  //   color: COLORS.black,
  //   fontWeight: '100',
  //   marginTop: SIZES.base,
  //   marginBottom: SIZES.base / 2,
  // },
  description: {
    ...FONTS.tiny,
    color: COLORS.black,
    fontWeight: '100',
    marginTop: SIZES.base,
    marginBottom: SIZES.base / 2,
    textAlign: 'center',
    width: '100%',
  },
  iconView: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 2,
    // alignSelf: 'flex-start',
    borderRadius: SIZES.radius / 2,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 1.5,
    // marginLeft: SIZES.base,
  },
  percentIcon: {
    position: 'absolute',
    top: -1,
    left: 5,
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
    fontSize: verticalScale(8),
    textAlign: 'center',
  },
  percentView: {
    position: 'relative',
    minHeight: 30,
    width: 30,
  },
});

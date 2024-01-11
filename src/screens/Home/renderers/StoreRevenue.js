import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import UseIcon from '../../../shared/utils/UseIcon';

export default function StoreRevenue({
  amount = 0,
  completed = 0,
  processing = 0,
}) {
  const [showBalance, setShowBalance] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.amountView}>
        <View style={styles.titleView}>
          <UseIcon
            type={'Fontisto'}
            name="shopping-store"
            size={verticalScale(11)}
            color={COLORS.primary}
          />

          <Text style={styles.title}>Store Revenue</Text>
        </View>
        <Pressable
          style={styles.visbleIcon}
          onPress={() => setShowBalance(!showBalance)}>
          <UseIcon
            type={'Ionicons'}
            name={showBalance ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={COLORS.textPrimary}
          />
        </Pressable>
      </View>

      {/* <Text style={styles.description}>Your store revenue is:</Text> */}

      <View style={styles.amountView}>
        <Text style={{...FONTS.regular}}>Total</Text>
        <Text style={styles.amount}>
          {showBalance
            ? Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(amount)
            : '**********'}
        </Text>

        {/* <View style={styles.percentView}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-drop-up"
            size={23}
            color={COLORS.secondary}
            style={styles.percentIcon}
          />

          <Text style={styles.percentText}>20%</Text>
        </View> */}
      </View>
      <View style={styles.amountView}>
        <Text style={{...FONTS.regular}}>Completed</Text>
        <Text style={styles.amount}>
          {showBalance
            ? Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(completed)
            : '**********'}
        </Text>

        {/* <View style={styles.percentView}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-drop-up"
            size={23}
            color={COLORS.secondary}
            style={styles.percentIcon}
          />

          <Text style={styles.percentText}>20%</Text>
        </View> */}
      </View>
      <View style={styles.amountView}>
        <Text style={{...FONTS.regular}}>Processing</Text>
        <Text style={styles.amount}>
          {showBalance
            ? Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN',
              }).format(processing)
            : '**********'}
        </Text>

        {/* <View style={styles.percentView}>
          <UseIcon
            type={'MaterialIcons'}
            name="arrow-drop-up"
            size={23}
            color={COLORS.secondary}
            style={styles.percentIcon}
          />

          <Text style={styles.percentText}>20%</Text>
        </View> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  amount: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
    marginRight: SIZES.base / 2,
  },
  visbleIcon: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 5,
  },
  amountView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  container: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 2,
    borderRadius: SIZES.radius,
    backgroundColor: '#EEEFF9',
    // height: verticalScale(120),
    overflow: 'scroll',
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
    ...FONTS.h5,
    marginLeft: SIZES.base / 1.5,
    color: COLORS.textPrimary,
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base * 1.5,
  },
});

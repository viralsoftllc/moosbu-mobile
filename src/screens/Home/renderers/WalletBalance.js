import React, {useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';

import UseIcon from '../../../shared/utils/UseIcon';

export default function WalletBalance({}) {
  const [showBalance, setShowBalance] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <UseIcon
          type={'Ionicons'}
          name="wallet-outline"
          size={verticalScale(15)}
          color={COLORS.primary}
        />

        <Text style={styles.title}>Wallet Balance</Text>
      </View>

      <Text style={styles.description}>Your wallet balance is:</Text>

      <View style={styles.amountView}>
        <Text style={styles.amount}>
          {showBalance ? 'N1,500,000' : '**********'}
        </Text>

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
    backgroundColor: 'rgba(2, 71, 166, 0.2)',
    height: verticalScale(120),
  },
  description: {
    ...FONTS.small,
    color: COLORS.black,
    fontWeight: '100',
    marginTop: SIZES.base * 2,
    marginBottom: SIZES.base,
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
  visbleIcon: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 5,
  },
});

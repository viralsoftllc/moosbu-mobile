import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import {selectWalletBalance} from '../../../redux/slices/wallet/selectors';

import UseIcon from '../../../shared/utils/UseIcon';

export default function WalletBalance({loading, handlePress}) {
  const [showBalance, setShowBalance] = useState(true);
  const balance = useSelector(selectWalletBalance);

  return (
    <View style={styles.container} onPress={handlePress}>
      <View style={styles.titleView}>
        <UseIcon
          type={'Ionicons'}
          name="wallet-outline"
          size={verticalScale(15)}
          color={COLORS.primary}
        />

        <Text style={styles.title}>Wallet Balance</Text>
      </View>

      {/* <Text style={styles.description}>Your wallet balance is:</Text> */}

      <View style={styles.amountView}>
        {loading ? (
          <ActivityIndicator size={'small'} />
        ) : (
          <>
            <Text style={styles.amount}>
              {showBalance
                ? `${
                    Intl.NumberFormat('en-NG', {
                      style: 'currency',
                      currency: 'NGN',
                    }).format(balance) || 0
                  }`
                : '**********'}
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
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: COLORS.textPrimary,
    ...FONTS.h4,
    fontWeight: '600',
    marginRight: SIZES.base / 2,
    // width: '80%',
  },
  amountView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 2,
    borderRadius: SIZES.radius,
    backgroundColor: 'rgba(2, 71, 166, 0.2)',
    height: verticalScale(90),
  },
  description: {
    ...FONTS.small,
    color: COLORS.black,
    fontWeight: '100',
    marginTop: SIZES.base * 2,
    marginBottom: SIZES.base,
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
  visbleIcon: {
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 5,
  },
});

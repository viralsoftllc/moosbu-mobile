import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, SafeAreaView, StyleSheet, Pressable} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {selectWalletBalance} from '../../redux/slices/wallet/selectors';
import {setWalletBalance} from '../../redux/slices/wallet/slice';
import client from '../../shared/api/client';
import handleApiError from '../../shared/components/handleApiError';
import routes from '../../shared/constants/routes';
import UseIcon from '../../shared/utils/UseIcon';
import TransactionHistory from './renderers/TransactionHistory';

export default function Wallet() {
  const {navigate} = useNavigation();
  const balance = useSelector(selectWalletBalance);
  const dispatch = useDispatch();

  const [showBalance, setShowBalance] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);

  const getWalletBalance = useCallback(async () => {
    try {
      // console.log('Fetching wallet balance');
      const {data} = await client.get('/api/wallet_balance');
      // console.log(data?.balance);
      dispatch(setWalletBalance(data?.balance));
    } catch (error) {
      // handleApiError(error);
    }
  }, [dispatch]);

  const getWalletTransactions = useCallback(async () => {
    setTransactionsLoading(true);

    try {
      // console.log('Fetching wallet transactions');
      const {data} = await client.get('/api/transactions');
      // console.log(data);
      setTransactionsLoading(false);

      setTransactions(data);
    } catch (error) {
      setTransactionsLoading(false);
      handleApiError(error);
    }
  }, []);

  useEffect(() => {
    getWalletBalance();
    getWalletTransactions();
  }, [getWalletTransactions, getWalletBalance]);

  const ctaData = [
    {
      label: 'Settings',
      iconType: 'Feather',
      iconName: 'settings',
      route: routes.PAYOUT_SETTINGS,
    },
    {
      label: 'Send',
      iconType: 'Feather',
      iconName: 'arrow-up-right',
      route: routes.SEND_FUNDS,
    },
    {
      label: 'Deposit',
      iconType: 'Feather',
      iconName: 'arrow-down-left',
      route: routes.CHOOSE_PAYMENT_METHOD,
    },
    {
      label: 'Withdraw',
      iconType: 'FAIcon',
      iconName: 'bank',
      route: routes.WITHDRAW,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScreenHeader title={'Wallet'} /> */}

      <View style={styles.main}>
        {/* Card */}
        <View style={styles.balanceCard}>
          <View style={styles.titleView}>
            <UseIcon
              type={'Ionicons'}
              name="wallet-outline"
              size={verticalScale(15)}
              color={COLORS.white}
            />

            <Text style={styles.title}>Wallet Balance</Text>
          </View>

          <View style={styles.amountView}>
            <Text style={styles.amount}>
              {showBalance ? `₦${balance}` : '***********'}
            </Text>
            {/* <UseIcon type={'Ionicons'} name="eye-outline" /> */}
            <Pressable
              style={styles.visbleIcon}
              onPress={() => setShowBalance(!showBalance)}>
              <UseIcon
                type={'Ionicons'}
                name={showBalance ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color={COLORS.white}
              />
            </Pressable>
          </View>

          <Text style={styles.date}>21, July 2023</Text>

          <View style={styles.cashflowView}>
            <Text style={styles.sent}>Sent ₦1,000,000</Text>
            <Text style={styles.received}>Received ₦540,000</Text>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaView}>
          {ctaData?.map((cta, i) => (
            <View key={i} style={styles.ctaWrapper}>
              <Pressable
                style={styles.ctaBtn}
                onPress={() => navigate(cta?.route)}>
                <UseIcon
                  type={cta.iconType}
                  name={cta.iconName}
                  color={COLORS.white}
                  size={16}
                />
              </Pressable>

              <Text style={styles.ctaLabel}>{cta.label}</Text>
            </View>
          ))}
        </View>

        {/* Transaction history */}
        <TransactionHistory
          showFilterOptions
          loading={transactionsLoading}
          transactions={transactions}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  amount: {
    color: COLORS.white,
    ...FONTS.h3,
    marginRight: SIZES.base,
  },
  amountView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base / 2,
    width: '80%',
    // justifyContent: 'space-between',
  },
  balanceCard: {
    backgroundColor: COLORS.primary,
    padding: SIZES.base * 2,
    borderRadius: SIZES.radius,
  },
  cashflowView: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: SIZES.base * 2,
    justifyContent: 'space-between',
    width: '70%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: SIZES.base * 3,
  },
  ctaBtn: {
    backgroundColor: COLORS.primary,
    padding: SIZES.base * 1.5,
    borderRadius: 100,
    marginBottom: SIZES.base,
  },
  ctaView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.base * 2.5,
  },
  ctaWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: SIZES.base / 1.5,
  },
  ctaLabel: {
    color: COLORS.textPrimary,
    ...FONTS.medium,
    fontWeight: '400',
  },
  date: {
    color: COLORS.grayText,
    ...FONTS.tiny,
  },
  main: {
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  title: {
    ...FONTS.regular,
    marginLeft: SIZES.base,
    fontWeight: '300',
    color: COLORS.white,
  },
  titleView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.base * 2,
  },
  received: {
    color: COLORS.grayText,
    ...FONTS.tiny,
  },
  sent: {
    color: COLORS.grayText,
    ...FONTS.tiny,
    marginRight: SIZES.base * 3,
  },
});

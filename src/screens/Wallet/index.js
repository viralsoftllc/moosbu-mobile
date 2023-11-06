import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
  RefreshControl,
  Modal,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';

import {COLORS, FONTS, SIZES} from '../../assets/themes';
import {
  selectWalletBalance,
  selectAccountNumber,
  selectAccountName,
  selectBank,
} from '../../redux/slices/wallet/selectors';
import {
  setAccountName,
  setAccountNumber,
  setBank,
  setWalletBalance,
} from '../../redux/slices/wallet/slice';
import client from '../../shared/api/client';
import handleApiError from '../../shared/components/handleApiError';
import routes from '../../shared/constants/routes';
import UseIcon from '../../shared/utils/UseIcon';
import TransactionHistory from './renderers/TransactionHistory';
import HalfScreen from '../finances/renderers/halfScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ficon from 'react-native-vector-icons/Feather';
import copyToClipboard from '../../shared/utils/copyToClipboard';
import ScreenHeader from '../../shared/components/ScreenHeader';
import Test from '../Test';

export default function Wallet({navigation}) {
  const {navigate} = useNavigation();
  const balance = useSelector(selectWalletBalance);
  const accountNumber = useSelector(selectAccountNumber);
  const accountName = useSelector(selectAccountName);
  const bank = useSelector(selectBank);

  // console.log(accountNumber);
  const dispatch = useDispatch();

  const [showBalance, setShowBalance] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [walletLoading, setWalletLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [bankDetailsModal, setBankDetailsModal] = useState(false);

  const getWalletBalance = useCallback(async () => {
    try {
      setWalletLoading(true);
      // console.log('Fetching wallet balance');
      const {data} = await client.get('/api/wallet');

      const balanceinNaira = data?.balance.availableBalance / 100;
      // console.log(data);
      // console.log(data?.details[0].attributes.accountNumber);
      dispatch(setWalletBalance(balanceinNaira));
      dispatch(setAccountNumber(data?.details[0].attributes.accountNumber));
      dispatch(setAccountName(data?.details[0].attributes.accountName));
      dispatch(setBank(data?.details[0].attributes.bank.name));
      setTransactions(data?.transactions);

      setWalletLoading(false);
    } catch (error) {
      setWalletLoading(false);
      handleApiError(error);
    }
  }, [dispatch]);

  // const getWalletTransactions = useCallback(async () => {
  //   setTransactionsLoading(true);

  //   try {
  //     // console.log('Fetching wallet transactions');
  //     const {data} = await client.get('/api/wallet');
  //     console.log(data);

  //     const {transactions} = data;
  //     setTransactionsLoading(false);

  //     setTransactions(transactions);
  //   } catch (error) {
  //     setTransactionsLoading(false);
  //     handleApiError(error);
  //   }
  // }, []);

  useEffect(() => {
    getWalletBalance();
  }, [getWalletBalance]);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getWalletBalance();
    });
  }, [navigation]);

  const ctaData = [
    {
      label: 'Settings',
      iconType: 'Feather',
      iconName: 'settings',
      route: routes.WALLET_SETTINGS,
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
      {walletLoading ? (
        <Test />
      ) : (
        <>
          <Text
            style={{
              ...FONTS.h5,

              marginBottom: 20,
              marginTop: 10,
              textAlign: 'center',
            }}>
            Wallet
          </Text>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl
                refreshing={walletLoading}
                onRefresh={() => {
                  setWalletLoading(true);
                  getWalletBalance();
                }}
              />
            }>
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
                    {showBalance
                      ? `${
                          Intl.NumberFormat('en-NG', {
                            style: 'currency',
                            currency: 'NGN',
                          }).format(balance) || 0
                        }`
                      : '***********'}
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

                <Text style={styles.date}>{new Date().toDateString()}</Text>

                {/* <View style={styles.cashflowView}>
              <Text style={styles.sent}>Sent ₦0</Text>
              <Text style={styles.received}>Received ₦0</Text>
            </View> */}
              </View>

              {/* CTA */}
              <View style={styles.ctaView}>
                {/* {ctaData?.map((cta, i) => (
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
            ))} */}

                <View style={styles.ctaWrapper}>
                  <Pressable
                    style={styles.ctaBtn}
                    onPress={() => navigate(routes.WALLET_SETTINGS)}>
                    <UseIcon
                      type={'Feather'}
                      name={'settings'}
                      color={COLORS.white}
                      size={16}
                    />
                  </Pressable>

                  <Text style={styles.ctaLabel}>{'Settings'}</Text>
                </View>
                <View style={styles.ctaWrapper}>
                  <Pressable
                    style={styles.ctaBtn}
                    onPress={() => navigate(routes.SEND_FUNDS)}>
                    <UseIcon
                      type={'Feather'}
                      name={'arrow-up-right'}
                      color={COLORS.white}
                      size={16}
                    />
                  </Pressable>

                  <Text style={styles.ctaLabel}>{'Send'}</Text>
                </View>
                <View style={styles.ctaWrapper}>
                  <Pressable
                    style={styles.ctaBtn}
                    onPress={() => setModalOpen(true)}>
                    <UseIcon
                      type={'Feather'}
                      name={'arrow-down-left'}
                      color={COLORS.white}
                      size={16}
                    />
                  </Pressable>

                  <Text style={styles.ctaLabel}>{'Deposit'}</Text>
                </View>
                {/* <View style={styles.ctaWrapper}>
              <Pressable
                style={styles.ctaBtn}
                onPress={() => navigate(routes.WITHDRAW)}>
                <UseIcon
                  type={'FAIcon'}
                  name={'bank'}
                  color={COLORS.white}
                  size={16}
                />
              </Pressable>

              <Text style={styles.ctaLabel}>{'Withdraw'}</Text>
            </View> */}
              </View>

              {/* Transaction history */}
              <TransactionHistory
                showFilterOptions
                loading={transactionsLoading}
                transactions={transactions}
              />
            </View>
          </ScrollView>
          {/* <Modal visible={modalOpen} animationType="slide" transparent={true}>
        <HalfScreen>
          <View
            style={{
              marginVertical: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{...FONTS.medium, textAlign: 'center'}}>
              Select a preferred way to fund your wallet
            </Text>
            <Pressable
              onPress={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
              }}>
              <Icon name="close" size={25} />
            </Pressable>
          </View>

          <View
            style={{
              marginVertical: 10,
              flex: 1,
            }}>
            <Pressable
              onPress={() => setBankDetailsModal(true)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                flex: 1,
              }}>
              <View style={{flex: 1}}>
                <UseIcon
                  type={'FAIcon'}
                  name={'bank'}
                  color={COLORS.primary}
                  size={30}
                />
              </View>

              <View style={{flex: 2}}>
                <Text style={{...FONTS.regular}}>Bank transfer</Text>
                <Text style={{...FONTS.medium}}>
                  Transfer easily from your bank account
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.regular,
                    color: COLORS.secondary,
                    backgroundColor: COLORS.lightSecondaryBackground,
                    borderRadius: 30,
                    textAlign: 'center',

                    padding: 10,
                  }}>
                  Recommended
                </Text>
              </View>
            </Pressable>
          </View>
          <View
            style={{
              marginVertical: 10,
              flex: 1,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                flex: 1,
              }}>
              <View style={{flex: 1}}>
                <UseIcon
                  type={'Ionicons'}
                  name={'card-outline'}
                  color={COLORS.primary}
                  size={30}
                />
              </View>

              <View style={{flex: 2}}>
                <Text style={{...FONTS.regular}}>Card payments</Text>
                <Text style={{...FONTS.medium}}>
                  Use any of your card to fund your wallet
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.regular,
                    color: COLORS.secondary,
                    backgroundColor: COLORS.lightSecondaryBackground,
                    borderRadius: 30,
                    textAlign: 'center',

                    padding: 10,
                  }}>
                  Coming soon
                </Text>
              </View>
            </Pressable>
          </View>
          <View
            style={{
              marginVertical: 10,
              flex: 1,
            }}>
            <Pressable
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 2,
                flex: 1,
              }}>
              <View style={{flex: 1}}>
                <UseIcon
                  type={'MaterialCommunityIcons'}
                  name={'cube-send'}
                  color={COLORS.primary}
                  size={30}
                />
              </View>

              <View style={{flex: 2}}>
                <Text style={{...FONTS.regular}}>Third party fintech apps</Text>
                <Text style={{...FONTS.medium}}>
                  Transfer easily from selected fintech apps
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.regular,
                    color: COLORS.secondary,
                    backgroundColor: COLORS.lightSecondaryBackground,
                    borderRadius: 30,
                    textAlign: 'center',

                    padding: 10,
                  }}>
                  Coming soon
                </Text>
              </View>
            </Pressable>
          </View>
        </HalfScreen>
      </Modal> */}
          <Modal visible={modalOpen} animationType="slide" transparent>
            <HalfScreen>
              <View
                style={{
                  marginVertical: 20,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    ...FONTS.h5,
                    color: COLORS.label,
                    textAlign: 'center',
                  }}>
                  NGN Bank Transfer
                </Text>
                <Pressable onPress={() => setModalOpen(false)} style={{}}>
                  <Icon name="close" size={25} />
                </Pressable>
              </View>

              <Text
                style={{
                  alignSelf: 'center',
                  ...FONTS.medium,
                  color: COLORS.label,
                  marginTop: 20,
                  marginBottom: 10,
                }}>
                {bank}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 15,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.primary,
                  }}>
                  {accountNumber}
                </Text>
                <Pressable onPress={() => copyToClipboard(accountNumber)}>
                  <Ficon name="copy" size={15} color={COLORS.primary} />
                </Pressable>
              </View>
              <Text
                style={{
                  ...FONTS.small,
                  alignSelf: 'center',
                  color: COLORS.grayText,
                }}>
                {accountName}
              </Text>

              <Text
                style={{
                  ...FONTS.small,
                  color: COLORS.grayText,
                  alignSelf: 'center',
                  marginTop: 50,
                }}>
                Your Moosbu NGN Wallet will be instantly funded if you make a
                bank transfer to the account number shown.
              </Text>

              {/* <View style={{marginTop: 20}}>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <Text style={{flex: 0.4, ...FONTS.medium, fontWeight: 700}}>
                Account Number :
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <Text style={{flex: 0.4, ...FONTS.medium, fontWeight: 700}}>
                Account Name :
              </Text>
              <Text style={{flex: 0.6, ...FONTS.regular}}>
                (MOOSBU)Moosbu Josh
              </Text>
            </View>
            <View style={{flexDirection: 'row', marginVertical: 5}}>
              <Text style={{flex: 0.4, ...FONTS.medium, fontWeight: 700}}>
                Bank Name :
              </Text>
              <Text style={{flex: 0.6, ...FONTS.regular}}>Moosbu bank</Text>
            </View>
          </View> */}

              {/* <Pressable
            style={{
              height: 44,
              width: '80%',
              backgroundColor: COLORS.primary,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                ...FONTS.regular,
                color: COLORS.white,
              }}>
              I have made payment
            </Text>
          </Pressable> */}
            </HalfScreen>
          </Modal>
        </>
      )}
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
    paddingTop: SIZES.base,
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

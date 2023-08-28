import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import UpdateSuccessful from '../../../shared/components/UpdateSuccessful';
import UseIcon from '../../../shared/utils/UseIcon';
import NewPaymentInfo from './renderer/NewPaymentInfo';
import {Paystack} from 'react-native-paystack-webview';
import {PAYSTACK_PUBLIC_KEY} from '@env';
import FormInput from '../../../shared/components/FormInput';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';
import Loader from '../../../shared/components/Loader';
import routes from '../../../shared/constants/routes';

export default function ChoosePaymentMethod() {
  const {setOptions, navigate} = useNavigation();
  const paystackWebViewRef = useRef(null);

  const [showNewPaymentInfoForm, setShowNewPaymentInfoForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [channel, setChannel] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [billingEmail, setBillingEmail] = useState('');
  const [billingAmount, setBillingAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={'Choose Payment Method'} />,
    });
  }, [setOptions]);

  function handleNewItem() {
    setShowNewPaymentInfoForm(true);
  }

  function handleSuccessfulResponse() {
    setShowNewPaymentInfoForm(false);
    setShowSuccessModal(true);
  }

  async function verifyTransaction(ref) {
    try {
      setLoading(true);
      const res = await client.get(`/api/verify/${ref}`);
      console.log('res from verify');
      console.log(res);
      console.log(res.data);
      setLoading(false);
      setShowPaymentModal(false);
      setChannel(null);
      setBillingAmount('');
      setBillingEmail('');
      notifyMessage('Wallet top up is successful');
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  // let b = {
  //   data: {
  //     event: 'successful',
  //     transactionRef: {
  //       message: 'Approved',
  //       redirecturl:
  //         'https://moosbu.store/verify-payments?trxref=T181631963608414&reference=T181631963608414',
  //       reference: 'T181631963608414',
  //       status: 'success',
  //       trans: '2962476750',
  //       transaction: '2962476750',
  //       trxref: 'T181631963608414',
  //     },
  //   },
  //   status: 'success',
  //   transactionRef: {
  //     message: 'Approved',
  //     redirecturl:
  //       'https://moosbu.store/verify-payments?trxref=T181631963608414&reference=T181631963608414',
  //     reference: 'T181631963608414',
  //     status: 'success',
  //     trans: '2962476750',
  //     transaction: '2962476750',
  //     trxref: 'T181631963608414',
  //   },
  // };

  // let c = {
  //   status: 'sucessful',
  //   transaction: {
  //     amount: 500,
  //     created_at: '2023-07-19T16:16:43.000000Z',
  //     flw_ref: 'Whatsstore-ZZBJS',
  //     id: 27,
  //     store_id: 173,
  //     trx_id: 3451,
  //     trx_ref: 'Whatsstore-CZLHJ',
  //     updated_at: '2023-07-19T16:16:43.000000Z',
  //   },
  //   wallet: {
  //     balance: 500,
  //     created_at: '2023-07-16T12:43:34.000000Z',
  //     id: 121,
  //     pin: '',
  //     store_id: 173,
  //     updated_at: '2023-07-19T16:16:43.000000Z',
  //   },
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}> */}
      {/* Add New Card */}
      {/* <View>
          <Text style={styles.label}>Debit or Credit Card</Text>

          <Pressable style={styles.addCard} onPress={handleNewItem}>
            <UseIcon
              type={'MaterialCommunityIcons'}
              name="plus-circle-outline"
              color={COLORS.primary}
            />
            <Text style={styles.addCardText}>Add New Card</Text>
          </Pressable>
        </View> */}

      {/* Card */}
      {/* <View>
          <Text style={styles.label}>Pay With Card</Text>

          <Pressable
            style={[styles.card, styles.ussdCard]}
            onPress={() => {
              setChannel(['card', 'ussd', 'bank']);
              setShowPaymentModal(true);
            }}
            // onPress={() => navigate(routes.BANK_TRANSFER)}
          >
            <View style={[styles.iconView, styles.ussdIconView]}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="swap-vertical"
                color={COLORS.white}
              />
            </View>
            <Text style={[styles.bankTransferText, styles.ussdCardText]}>
              Pay With Card
            </Text>
          </Pressable>
        </View> */}

      {/* Bank transfer */}
      {/* <View>
          <Text style={styles.label}>Bank Transfer</Text>

          <Pressable
            style={styles.card}
            onPress={() => {
              setChannel(['card', 'ussd', 'bank']);
              setShowPaymentModal(true);
            }}
            // onPress={() => navigate(routes.BANK_TRANSFER)}
          >
            <View style={styles.iconView}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="bank"
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.bankTransferText}>Bank Transfer</Text>
          </Pressable>
        </View> */}

      {/* USSD */}
      {/* <View>
          <Text style={styles.label}>USSD Transfer</Text>

          <Pressable
            style={[styles.card, styles.ussdCard]}
            onPress={() => {
              setChannel(['card', 'ussd', 'bank']);
              setShowPaymentModal(true);
            }}
            // onPress={() => navigate(routes.BANK_TRANSFER)}
          >
            <View style={[styles.iconView, styles.ussdIconView]}>
              <UseIcon
                type={'MaterialCommunityIcons'}
                name="swap-vertical"
                color={COLORS.white}
              />
            </View>
            <Text style={[styles.bankTransferText, styles.ussdCardText]}>
              USSD Transfer
            </Text>
          </Pressable>
        </View> */}
      {/* </ScrollView> */}

      <View
        style={{
          flex: 1,
          paddingVertical: SIZES.base * 3,
        }}>
        <Paystack
          paystackKey={PAYSTACK_PUBLIC_KEY}
          billingEmail={billingEmail}
          amount={billingAmount}
          onCancel={e => {
            // handle response here
            console.log('cancel');
            console.log(e);
          }}
          onSuccess={res => {
            console.log('res');
            console.log(res);
            // handle response here
            notifyMessage('Loading your wallet...');
            verifyTransaction(res.transactionRef?.reference);
          }}
          ref={paystackWebViewRef}
        />

        <FormInput
          label={'Email Address'}
          placeholder={'Enter Email Address'}
          onChangeText={text => setBillingEmail(text)}
          value={billingEmail}
        />

        <FormInput
          label={'Amount'}
          placeholder={'Enter Deposit Amount'}
          onChangeText={text => setBillingAmount(text)}
          value={billingAmount}
          keyboardType={'numeric'}
        />

        <FormButton
          title={'Pay Now'}
          onPress={() => {
            if (billingAmount && billingEmail) {
              paystackWebViewRef.current.startTransaction();
            } else {
              notifyMessage('Please enter Amount and Email address');
            }
          }}
          containerStyle={{marginTop: 'auto'}}
        />

        {/* <Pressable
              onPress={() => paystackWebViewRef.current.startTransaction()}>
              <Text>Pay Now</Text>
            </Pressable> */}
      </View>

      <Modal
        visible={showNewPaymentInfoForm}
        animationType="slide"
        transparent={true}>
        <NewPaymentInfo
          setShowNewPaymentInfoForm={setShowNewPaymentInfoForm}
          handleSuccessfulResponse={handleSuccessfulResponse}
        />
      </Modal>

      <Modal
        visible={showSuccessModal}
        animationType="slide"
        transparent={true}>
        <UpdateSuccessful
          setShowSuccessModal={setShowSuccessModal}
          message={'Payment successful'}
          subtitle={'Your wallet will be credited'}
          onPress={() => {
            navigate(routes.MAIN, {screen: routes.WALLET});
          }}
        />
      </Modal>

      {/* <Modal visible={showPaymentModal} animationType="slide">
        <SafeAreaView style={{flex: 1}}>
          <ScreenHeader
            title={'Payment Details'}
            onPress={() => setShowPaymentModal(false)}
          />

          <View
            style={{
              flex: 1,
              paddingHorizontal: SIZES.paddingHorizontal,
              paddingVertical: SIZES.base * 4,
            }}>
            <Paystack
              paystackKey={PAYSTACK_PUBLIC_KEY}
              billingEmail={billingEmail}
              amount={billingAmount}
              onCancel={e => {
                // handle response here
                console.log(e);
              }}
              onSuccess={res => {
                console.log('res');
                console.log(res);
                // handle response here
                notifyMessage('Loading your wallet...');
                verifyTransaction(res.transactionRef?.reference);
              }}
              ref={paystackWebViewRef}
              channels={JSON.stringify(['card', 'ussd', 'bank'])}
              // autoStart={true}
            />

            <FormInput
              label={'Email Address'}
              placeholder={'Enter Email Address'}
              onChangeText={text => setBillingEmail(text)}
              value={billingEmail}
            />

            <FormInput
              label={'Amount'}
              placeholder={'Enter Deposit Amount'}
              onChangeText={text => setBillingAmount(text)}
              value={billingAmount}
              keyboardType={'numeric'}
            />

            <FormButton
              title={'Pay Now'}
              onPress={() => {
                if (billingAmount && billingEmail) {
                  paystackWebViewRef.current.startTransaction();
                } else {
                  notifyMessage('Please enter Amount and Email address');
                }
              }}
              containerStyle={{marginTop: 'auto'}}
            />

            <Pressable
              onPress={() => paystackWebViewRef.current.startTransaction()}>
              <Text>Pay Now</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal> */}

      <Loader loading={loading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
  },
  addCard: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    height: verticalScale(80),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  addCardText: {
    color: COLORS.textPrimary,
    marginLeft: SIZES.base,
  },
  label: {
    marginBottom: SIZES.base,
    color: COLORS.textPrimary,
    ...FONTS.regular,
    fontWeight: '500',
    marginTop: SIZES.base * 3,
  },
  card: {
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    height: verticalScale(80),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.base * 2,
    backgroundColor: COLORS.primary,
  },
  iconView: {
    backgroundColor: COLORS.white,
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankTransferText: {
    color: COLORS.white,
    textAlign: 'center',
    flex: 1,
  },
  ussdText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  ussdCard: {
    backgroundColor: '#E4EDF9',
  },
  ussdCardText: {
    color: COLORS.textPrimary,
  },
  ussdIconView: {
    backgroundColor: COLORS.primary,
  },
});

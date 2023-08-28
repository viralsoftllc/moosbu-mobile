import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {verticalScale} from 'react-native-size-matters';
import {COLORS, FONTS, SIZES} from '../../../assets/themes';
import ScreenHeader from '../../../shared/components/ScreenHeader';
import routes from '../../../shared/constants/routes';

import UseIcon from '../../../shared/utils/UseIcon';
import FormInput from '../../../shared/components/FormInput';
import FormButton from '../../../shared/components/FormButton';
import notifyMessage from '../../../shared/hooks/notifyMessage';
import handleApiError from '../../../shared/components/handleApiError';
import client from '../../../shared/api/client';
import AuthorizeTransaction from '../renderers/AuthorizeTransaction';
import Loader from '../../../shared/components/Loader';

export default function Withdraw() {
  const {setOptions, navigate} = useNavigation();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');

  useLayoutEffect(() => {
    setOptions({
      header: () => <ScreenHeader title={''} />,
    });
  }, [setOptions]);

  function handleAuthorization() {
    if (!amount) return notifyMessage('Please enter amount');

    setShowAuthModal(true);
  }

  async function handleWithdraw(pin) {
    if (!amount) return notifyMessage('Please enter amount');
    if (!pin) return notifyMessage('Please enter PIN');
    setShowAuthModal(false);
    setLoading(true);

    try {
      const res = await client.post('/api/account/withdraw', {amount, pin});
      console.log('res from Withdrawal');
      console.log(res);
      console.log(res.data);
      setLoading(false);
      setAmount('');
      notifyMessage('Withdrawal is being processed');
    } catch (error) {
      setLoading(false);
      handleApiError(error);
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* Add New Card */}
        <Pressable
          style={styles.addCard}
          onPress={() => navigate(routes.PAYOUT_SETTINGS)}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="plus-circle-outline"
            color={COLORS.primary}
          />
          <Text style={styles.addCardText}>Add Bank Details</Text>
        </Pressable>

        {/* <Pressable style={[styles.card, styles.ussdCard]} onPress={handleNewItem}>
        <View style={[styles.iconView]}>
          <UseIcon
            type={'MaterialCommunityIcons'}
            name="bank"
            color={COLORS.primary}
          />
        </View>

        <View style={styles.details}>
          <Text style={[styles.name]}>Jooshu Moosbu</Text>

          <Text style={styles.subtitle}>
            Moosbu wallet bank <Text style={styles.acctNumber}>0123616457</Text>
          </Text>
        </View>
      </Pressable> */}

        <View style={{flex: 1}}>
          <View style={styles.header}>
            <Text style={styles.title}>Withdrawal</Text>
            <Text style={styles.subtitle}>
              Withdraw cash from you Moosbu wallet to your bank acccount
            </Text>
          </View>

          <FormInput
            label={'Amount'}
            placeholder="Enter amount to withdraw"
            keyboardType="number-pad"
            value={amount}
            onChangeText={text => setAmount(text)}
          />
          <Text style={styles.serviceFeeText}>
            Service Fee <Text style={styles.fee}>50</Text>
          </Text>
        </View>

        <FormButton
          title={'Proceed'}
          leftIcon={
            <UseIcon
              type={'MaterialIcons'}
              name="lock-outline"
              color={COLORS.white}
            />
          }
          // onPress={withdraw}
          onPress={handleAuthorization}
          loading={loading}
        />

        <Modal visible={showAuthModal} animationType="slide">
          <AuthorizeTransaction
            setCloseAuthModal={setShowAuthModal}
            onComplete={handleWithdraw}
            loading={loading}
          />
        </Modal>
      </SafeAreaView>

      <Loader loading={loading} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.paddingHorizontal,
    paddingBottom: SIZES.base * 2,
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
  card: {
    borderColor: COLORS.borderGray,
    borderRadius: SIZES.radius,
    height: verticalScale(80),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.base * 2,
    borderWidth: 1,
    marginVertical: SIZES.base * 2,
  },
  iconView: {
    backgroundColor: 'rgba(118, 163, 224, 0.1)',
    width: verticalScale(40),
    height: verticalScale(40),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ussdText: {
    color: COLORS.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
  details: {
    marginLeft: SIZES.base * 1.5,
  },
  name: {
    color: COLORS.textPrimary,
    ...FONTS.h5,
    marginBottom: SIZES.base,
  },
  // subtitle: {
  //   color: COLORS.grayText,
  // },
  acctNumber: {
    color: COLORS.primary,
  },
  header: {
    marginTop: SIZES.base * 3,
    marginBottom: SIZES.base * 3,
  },
  title: {
    ...FONTS.regular,
    color: COLORS.textPrimary,
  },
  subtitle: {
    ...FONTS.medium,
    color: COLORS.grayText,
  },
  serviceFeeText: {
    textAlign: 'right',
    ...FONTS.medium,
    color: COLORS.grayText,
    marginBottom: SIZES.base * 4,
  },
  fee: {
    color: COLORS.debit,
  },
});
